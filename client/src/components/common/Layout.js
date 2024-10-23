import React, { useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import '../../styles/Layout.css'; // Ensure to import your CSS file

const Layout = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="app-wrapper">
      <NavBar onToggleMenu={toggleMenu}/>
      <div className={`side-menu ${isMenuVisible ? 'visible' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/decks">Decks</Link></li>
            <li><Link to="/cards">Cards</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;