import React, { useState, useEffect } from 'react';
import { getAllDecks } from '../../api/Digimon';
import '../../styles/DeckSelector.css';

const DeckSelector = ({ onSelectDeck }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await getAllDecks();
        setDecks(fetchedDecks);
        setLoading(false);
      } catch (err) {
        setError('Error fetching decks');
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="deck-selector">
      <button onClick={toggleMenu} className="deck-selector-button">
        {isMenuOpen ? 'Hide Decks' : 'Select a Deck'}
      </button>
      {isMenuOpen && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && decks.map(deck => (
            <div 
              key={deck._id} 
              className="deck-selector-dropdown-item" 
              onClick={() => { onSelectDeck(deck); setIsMenuOpen(false); }}
            >
              {deck.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckSelector;