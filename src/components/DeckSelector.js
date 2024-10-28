import React, { useState } from "react";
import "../styles/DeckSelector.css";

const DeckSelector = ({ decks, onSelectDeck }) => {
  const [activeDeck, setActiveDeck] = useState(null);

  const handleDeckClick = (deck) => {
    setActiveDeck(deck.Name);
    onSelectDeck(deck);
  };

  return (
    <div className="deck-selector-grid">
      {decks.map((deck) => (
        <button
          key={deck.Name}
          className={`deck-button ${activeDeck === deck.Name ? "active" : ""}`}
          onClick={() => handleDeckClick(deck)}
        >
          {deck.Name}
        </button>
      ))}
    </div>
  );
};

export default DeckSelector;
