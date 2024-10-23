import React, { useEffect, useState } from 'react';
import { getAllDecks, getDeckWithCards } from '../../api/Digimon';
import FullView from './FullView';
import MidView from './MidView';
import ListView from './ListView';
import CarouselView from './CarouselView';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Digimon.css';
import DeckSelector from './DeckSelector';

const Decks = () => {
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

  const exportDeck = () => {
    const deckList = data.map(card => {
      const inDeckCount = parseInt(card['In Deck'], 10) || 0;
      return `${inDeckCount} ${card['Card Name']} ${card['Card Set']}`;
    }).join('\n');
    const deckString = `// Digimon DeckList\n\n${deckList}`;
    navigator.clipboard.writeText(deckString).then(() => {
      alert('Deck list copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  useEffect(() => {
    if (!data.length) {
      setError(null);
      const params = new URLSearchParams(location.search);
      const viewParam = params.get('view');
      const deckId = params.get('id');

      if (viewParam) {
        setView(viewParam);
      }

      if (deckId) {
      getAllDecks().then(decks => {
        const selectedDeck = decks.find(deck => deck._id === deckId);
          if (selectedDeck) {
            setSelectedDeck(selectedDeck);
          } else {
            setError('No matching deck found');
          }
        }).catch(err => {
          setError('Error fetching decks');
        });
      }
    }
  }, [location]);

  useEffect(() => {
    if (selectedDeck) {
      setLoading(true);
      navigate(`?view=${view}&id=${selectedDeck._id}`);
      getDeckWithCards(selectedDeck._id).then(deckData => {
        const parsedData = deckData.cards.map(deckCard => ({
          set: deckCard.card_id.set,
          number: deckCard.card_id.number,
          name: deckCard.card_id.name,
          quantity: deckCard.quantity,
          image: `https://images.digimoncard.io/images/cards/${deckCard.card_id.number}.jpg`
        }));
        setData(parsedData);
        setLoading(false);
      }).catch(err => {
        setError('Error fetching deck data');
        setLoading(false);
      });
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
    navigate(`?view=${newView}&id=${selectedDeck._id}`);
  };

  return (
    <>
      <button onClick={exportDeck}>Export Deck</button> {/* Add export button */}
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
            <button onClick={() => handleViewChange('carousel')} className={view === 'carousel' ? 'active' : ''}>Carousel</button>
          </div>
          {data && (
            <div className={`digimon-container ${view}`}>
              {view === 'full' && <FullView data={data} handleCardClick={handleCardClick} />}
              {view === 'mid' && <MidView data={data} />}
              {view === 'list' && <ListView data={data} />}
              {view === 'carousel' && (
                <CarouselView 
                  data={data}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Decks;