import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import NavBar from './NavBar';
import FullView from './FullView';
import MidView from './MidView';
import ListView from './ListView';
import CardStack from './CardStack';
import CarouselView from './CarouselView';
import { useLocation, useNavigate } from 'react-router-dom';

import '../styles/Digimon.css';
import DeckSelector from './DeckSelector';

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

const getDigimonCardImageUrl = (cardSet) => {
  return `https://images.digimoncard.io/images/cards/${cardSet}.jpg`;
};

const Digimon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [view, setView] = useState('full');
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const location = useLocation();

  const handleCardClick = (card) => () => {
    setSelectedCard(card);
  };

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

  const fetchData = async (deck) => {
    if (deck) {
      console.log(`Fetching data for deck: ${deck.name}`);
      try {
        const response = await axios.get(getDigimonDeckUrl(deck.guid));
        console.log('Data fetched successfully:', response.data);
        
        Papa.parse(response.data, {
          header: true,
          complete: async (results) => {
            console.log('CSV parsing complete. Parsed data:', results.data);
            
            const filteredData = results.data.filter(card => 
              isValid(card['In Deck']) &&
              isValid(card['Card Set']) &&
              isValid(card['Card Name']) &&
              isValid(card['Have']) &&
              isValid(card['Need'])
            )?.map(card => ({ ...card, Image: getDigimonCardImageUrl(card['Card Set']) }));

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
      setLoading(true);
      navigate(`?view=${view}&guid=${selectedDeck.guid}`);
      fetchData(selectedDeck);
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
    navigate(`?view=${newView}&guid=${selectedDeck.guid}`);
  };

  return (
    <>
      <DeckSelector onSelectDeck={handleSelectDeck} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <h2>{selectedDeck ? selectedDeck.name : 'Select a Deck'}</h2>
          <div className="view-selector">
            <button onClick={() => handleViewChange('full')} className={view === 'full' ? 'active' : ''}>Full</button>
            <button onClick={() => handleViewChange('mid')} className={view === 'mid' ? 'active' : ''}>Mid</button>
            <button onClick={() => handleViewChange('list')} className={view === 'list' ? 'active' : ''}>List</button>
            <button onClick={() => handleViewChange('stack')} className={view === 'stack' ? 'active' : ''}>Stack</button>
            <button onClick={() => handleViewChange('carousel')} className={view === 'carousel' ? 'active' : ''}>Carousel</button>
          </div>
          <div className={`digimon-container ${view}`}>
            {view === 'full' && <FullView data={data} handleCardClick={handleCardClick} />}
            {view === 'mid' && <MidView data={data} />}
            {view === 'list' && <ListView data={data} />}
            {view === 'stack' && (
              <CardStack getSpreadDeck={() => data.flatMap(card => {
                const inDeckCount = parseInt(card['In Deck'], 10) || 0;
                return Array.from({ length: inDeckCount }, () => card);
              })} handleCardClick={handleCardClick} selectedCard={selectedCard} />
            )}
            {view === 'carousel' && (
              <CarouselView 
                data={data}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Digimon;