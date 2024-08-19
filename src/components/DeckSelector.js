import React, { useState } from 'react';
import '../styles/DeckSelector.css';

const DIGIMON_SHEET_ID = '1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk';
const getDigimonDeckUrl = (guid) => {
  return `https://docs.google.com/spreadsheets/d/${DIGIMON_SHEET_ID}/pub?gid=${guid}&single=true&output=csv`;
}

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
  // Add more decks as needed
];

const DeckSelector = ({ onSelectDeck }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Digimon</div>
      <div 
        className="navbar-hamburger" 
        onClick={toggleMenu} 
        style={{ transform: isMenuOpen ? 'translateX(-250px)' : 'translateX(0)' }}
      >
        &#9776; {/* Hamburger icon */}
      </div>
      <div className={`navbar-dropdown ${isMenuOpen ? 'open' : ''}`}>
        {decks.map(deck => (
          <div 
            key={deck.name} 
            className="navbar-dropdown-item" 
            onClick={() => { onSelectDeck(deck); setIsMenuOpen(false); }}
          >
            {deck.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DeckSelector;