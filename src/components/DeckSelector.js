import React, { useState } from 'react';
import '../styles/DeckSelector.css';

const decks = [
  { name: 'Blue Hybrid', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=423063197&single=true&output=csv' },
  { name: 'DexDorugoramon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=2141440214&single=true&output=csv' },
  { name: 'Red Hybrid', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=1676514637&single=true&output=csv' },
  { name: 'DigiPolice', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=989741694&single=true&output=csv' },
  { name: 'Shinegreymon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=147658920&single=true&output=csv' },
  { name: 'Phoenixmon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=1539851034&single=true&output=csv' },
  { name: 'Eosmon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=538505515&single=true&output=csv' },
  { name: 'Omnimon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=1397861951&single=true&output=csv' },
  { name: 'Leviamon', url: 'https://docs.google.com/spreadsheets/d/1OUe7UXkv4thBKIpJu0E3d7fCVj3qUwxBuAZxKJ45nFk/pub?gid=2017365004&single=true&output=csv' },
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
            onClick={() => { onSelectDeck(deck.url); setIsMenuOpen(false); }}
          >
            {deck.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DeckSelector;