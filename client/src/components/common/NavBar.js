import React, { useState } from 'react';
import '../../styles/NavBar.css';

const NavBar = ({ onToggleMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Digimon</div>
      <button onClick={onToggleMenu} className="hamburger-button">
        &#9776;
      </button>
    </nav>
  );
};

export default NavBar;