import React from 'react';
import NavBar from './NavBar';
import '../styles/AppWrapper.css'; // Ensure to import your CSS file

const AppWrapper = ({ children }) => {
  return (
    <div className="app-wrapper">
      <NavBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default AppWrapper;