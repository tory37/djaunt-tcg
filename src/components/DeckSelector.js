import React, { useState } from "react";
import "../styles/DeckSelector.css";

const DeckSelector = ({ decks, onSelectDeck }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="deck-selector">
      <button onClick={toggleMenu} className="deck-selector-button">
        {isMenuOpen ? "Hide Decks" : "Select a Deck"}
      </button>
      {isMenuOpen && (
        <div>
          {decks.map((deck) => (
            <div
              key={deck.Name}
              className="deck-selector-dropdown-item"
              onClick={() => {
                onSelectDeck(deck);
                setIsMenuOpen(false);
              }}
            >
              {deck.Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckSelector;
