import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import DeckSelector from './DeckSelector';
import '../styles/Digimon.css';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

const DIGIMON_SHEET_ID = '1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk';
const decks = [
  { name: 'Blue Hybrid', guid: '423063197' },
  { name: 'DexDorugoramon', guid: '2141440214' },
  { name: 'Red Hybrid', guid: '1676514637' },
  { name: 'DigiPolice', guid: '989741694' },
  { name: 'Shinegreymon', guid: '147658920' },
  { name: 'Phoenixmon', guid: '1539851034' },
  { name: 'Eosmon', guid: '538505515' },
  { name: 'Omnimon', guid: '1397861951' },
  { name: 'Leviamon', guid: '2017365004' },
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
  const [selectedCard, setSelectedCard] = useState(null); // State to track the selected card
  const [drawnImages, setDrawnImages] = useState([]);

  const handleCardClick = (card) => () => {
    setSelectedCard(card); // Set the selected card when clicked
  };

  const handleDraw = () => {
    const randomImages = [];
    const availableImages = getSpreadDeck().map(card => card['Image']);
    
    while (randomImages.length < 5) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const randomImage = availableImages[randomIndex];
      if (!randomImages.includes(randomImage)) {
        randomImages.push(randomImage);
      }
    }
    
    setDrawnImages(randomImages);
  };

  const getSpreadDeck = () => {
    return data.flatMap(card => {
      const inDeckCount = parseInt(card['In Deck'], 10) || 0;
      return Array.from({ length: inDeckCount }, () => card);
    });
  };

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
      const selectedDeck = decks.find(deck => deck.guid === guidParam);
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
    <div className="digimon">
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
            <button onClick={() => handleViewChange('stack')} className={view === 'stack' ? 'active' : ''}>Stack</button> {/* New Stack View */}
            <button onClick={() => handleViewChange('carousel')} className={view === 'carousel' ? 'active' : ''}>Carousel</button>
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
                        style={{ 
                          marginTop: `${i > 0 ? -200 : 0}px`, 
                          zIndex: i,
                        }}
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
              const setNameParts = card['Card Set'] ? card['Card Set'].split('-') : ['', ''];
              const firstPart = setNameParts[0];
              const secondPart = setNameParts[1] ? `${setNameParts[1]}` : '';

              return (
                <div className="list-card" key={index}>
                  <div className="list-card-name">{card['Card Name']}</div>
                  <div className="vertical-line"></div>
                  <div className="list-card-set">
                    <span className="set-label">Set:</span> {firstPart}
                  </div>
                  <div className="vertical-line"></div>
                  <div className="list-card-set-number">
                    <span className="set-number-label">#:</span> {secondPart}
                  </div>
                  <div className="vertical-line"></div>
                  <div className="list-card-count">
                    <span className="have-label">Have:</span> {card['Have']} / <span className="in-deck-label">{inDeckCount}</span>
                  </div>
                </div>
              );
            })}
            {view === 'stack' && (
              <>
                <div className="stack-container">
                  {getSpreadDeck().map((card, index) => (
                    <div key={`${card['Card Name']}-${index}`} className="stack-card">
                      <img src={card['Image']} alt={card['Card Name']} onClick={handleCardClick(card)} className="stack-card-image" />
                    </div>
                  ))}
                </div>
                <div className="selected-card">
                  {selectedCard ? (
                    <img src={selectedCard['Image']} alt={selectedCard['Card Name']} className="large-card-image" />
                  ) : (
                    <div className="select-card-placeholder">
                      Select a card
                    </div>
                  )}
                </div>
              </>
            )}
            {view === 'carousel' && (
              <div className="carousel-container">
                <Carousel images={getSpreadDeck().map(card => card['Image'])} />
                <div className="random-images">
                  {drawnImages.map((image, index) => (
                    <img key={index} src={image} alt={`Random ${index}`} className="random-image" />
                  ))}
                </div>
                <button className="draw-button" onClick={handleDraw}>Draw</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Digimon;