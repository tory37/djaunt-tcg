import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import DeckSelector from './DeckSelector';
import '../styles/Digimon.css';

const Digimon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deckUrl, setDeckUrl] = useState('');
  const [view, setView] = useState('full'); // State to manage the current view

  const isValid = (value) => {
    return value !== undefined && value !== null && value !== '';
  };

  const fetchData = async (url) => {
    console.log('Fetching data from Google Sheets...');
    try {
      const response = await axios.get(url);
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
  };

  useEffect(() => {
    if (deckUrl) {
      fetchData(deckUrl);
    }
  }, [deckUrl]);

  const handleSelectDeck = (url) => {
    setDeckUrl(url);
    setLoading(true); // Reset loading state
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const exportDeck = () => {
    const deckList = data.map(card => {
      const inDeckCount = parseInt(card['In Deck'], 10) || 0;
      return `${inDeckCount} ${card['Card Name']} ${card['Card Set']}`;
    }).join('\n');
    const deckString = `// Digimon DeckList\n\n${deckList}`;
    alert(deckString);
  };

  return (
    <div>
      <DeckSelector onSelectDeck={handleSelectDeck} />
      <button onClick={exportDeck}>Export Deck</button> {/* Add export button */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2>{deckUrl ? deckUrl.split('/').pop() : 'Select a Deck'}</h2> {/* Display current deck name */}
      <div className="view-selector">
        <button onClick={() => handleViewChange('full')} className={view === 'full' ? 'active' : ''}>Full</button>
        <button onClick={() => handleViewChange('mid')} className={view === 'mid' ? 'active' : ''}>Mid</button>
        <button onClick={() => handleViewChange('list')} className={view === 'list' ? 'active' : ''}>List</button>
      </div>
      <div className={`digimon-container ${view}`}>
        {view === 'full' && data.map((card, index) => {
          const inDeckCount = parseInt(card['In Deck'], 10) || 0;
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
                <div className="card-set">{card['Card Set']}</div>
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
    </div>
  );
};

export default Digimon;