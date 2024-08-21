import React from 'react';
import DeckSelector from './DeckSelector';

const AppWrapper = ({ children }) => {
  return (
    <div className="app-wrapper">
      <div className="content">{children}</div>
    </div>
  );
};

export default AppWrapper;