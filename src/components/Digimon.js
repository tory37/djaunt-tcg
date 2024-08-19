import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import DeckSelector from './DeckSelector';
import '../styles/Digimon.css';
import { useNavigate } from 'react-router-dom';

const DIGIMON_SHEET_ID = '1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk';
const decks = [
  { name: 'Blue Hybrid', guid: 423063197 },
  { name: 'DexDorugoramon', guid: 2141440214 },
  { name: 'Red Hybrid', guid: 1676514637 },
  { name: 'DigiPolice', guid: 989741694 },
  { name: 'Shinegreymon', guid: 147658920 },
  { name: 'Phoenixmon', guid: 1539851034 },
  { name: 'Eosmon', guid: 538505515 },
  { name: 'Omnimon', guid: 1397861951 },
  { name: 'Leviamon', guid: 2017365004 },
];

const getDigimonDeckUrl = (guid) => {
  return `https://docs.google.com/spreadsheets/d/${DIGIMON_SHEET_ID}/pub?gid=${guid}&single=true&output=csv`;
};

const Digimon = ({ location }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [view, setView] = useState('full'); // Default view
  const navigate = useNavigate(); // Initialize useNavigate

  // Read query parameters
  useEffect(() => {
    setError(null);
    const params = new URLSearchParams(location.search);
    const viewParam = params.get('view');
    const guidParam = params.get('guid');

    if (viewParam) {
      setView(viewParam);
    }

    if (guidParam) {
      const selectedDeck = decks.find(deck => deck.guid === parseInt(guidParam));
      if (selectedDeck) {
        setSelectedDeck(selectedDeck);
      } else {
        setError('No matching deck found');
      }
    }
  }, [location]);

  const isValid = (value) => {
    return value !== undefined && value !== null && value !== '';
  };

  const fetchData = async () => {
    if (selectedDeck) {
      console.log('Fetching data from Google Sheets...');
      try {
        const response = await axios.get(getDigimonDeckUrl(selectedDeck.guid));
        console.log('Data fetched successfully:', response.data);
        
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            console.log('CSV parsing complete. Parsed data:', results.data);
            
            const filteredData = results.data.filter(card => 
              isValid(card['In Deck']) &&
              isValid(card['Card Set']) &&
              isValid(card['Card Name']) &&
              isValid(card['Have']) &&
              isValid(card['Need']) &&
              isValid(card['Image'])
            );

            console.log('Filtered data:', filteredData);
            setData(filteredData);
            setLoading(false);
          },
          error: (err) => {
            console.error('Error parsing CSV data:', err);
            setError('Error parsing CSV data');
            setLoading(false);
          },
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    } 
  };

  useEffect(() => {
    if (selectedDeck) {
      setLoading(true); // Reset loading state
      navigate(`?view=${view}&guid=${selectedDeck.guid}`); // Update URL with view and selected deck GUID
      fetchData(getDigimonDeckUrl(selectedDeck.guid));
    } else {
      setError('No matching deck found');
      setLoading(false);
      setSelectedDeck(null)
    }
  }, [selectedDeck]);

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    navigate(`?view=${newView}&guid=${selectedDeck.guid}`); // Update URL with new view and current deck GUID
  };

  return (
    <div>
      <DeckSelector onSelectDeck={handleSelectDeck} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
        <h2>{selectedDeck ? selectedDeck.name : 'Select a Deck'}</h2> {/* Display current deck name */}
          <div className="view-selector">
            <button onClick={() => handleViewChange('full')} className={view === 'full' ? 'active' : ''}>Full</button>
            <button onClick={() => handleViewChange('mid')} className={view === 'mid' ? 'active' : ''}>Mid</button>
            <button onClick={() => handleViewChange('list')} className={view === 'list' ? 'active' : ''}>List</button>
          </div>
          <div className={`digimon-container ${view}`}>
            {view === 'full' && data.map((card, index) => {
              const inDeckCount = parseInt(card['In Deck'], 10) || 0;
              const setNameParts = card['Card Set'] ? card['Card Set'].split('-') : ['', ''];
              const firstPart = setNameParts[0];
              const secondPart = setNameParts[1] ? `#${setNameParts[1]}` : '';

              return (
                <div className="card" key={index}>
                  <div className="card-image-container">
                    {[...Array(inDeckCount)].map((_, i) => (
                      <img
                        key={i}
                        src={card['Image']}
                        alt={card['Card Name']}
                        className="card-image"
                        style={{ marginTop: `${i > 0 ? -200 : 0}px`, zIndex: inDeckCount - i }}
                      />
                    ))}
                  </div>
                  <div className="card-details-container">
                    <div className="card-name">{card['Card Name']}</div>
                    <div className="card-count">{card['Have']} / {inDeckCount}</div>
                    <div className="card-set">{firstPart}</div>
                    <div className="card-set-number">{secondPart}</div>
                  </div>
                </div>
              );
            })}
            {view === 'mid' && data.map((card, index) => {
              const inDeckCount = parseInt(card['In Deck'], 10) || 0;
              return (
                <div className="mid-card" key={index}>
                  <img src={card['Image']} alt={card['Card Name']} className="mid-card-image" />
                  <div className="mid-card-details">
                    <div className="mid-card-name">{card['Card Name']}</div>
                    <div className="mid-card-set">{card['Card Set']}</div>
                    <div className="mid-card-count">{card['Have']} / {inDeckCount}</div>
                  </div>
                </div>
              );
            })}
            {view === 'list' && data.map((card, index) => {
              const inDeckCount = parseInt(card['In Deck'], 10) || 0;
              return (
                <div className="list-card" key={index}>
                  <div className="list-card-name">{card['Card Name']}</div>
                  <div className="list-card-set">{card['Card Set']}</div>
                  <div className="list-card-count">{card['Have']} / {inDeckCount}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Digimon;