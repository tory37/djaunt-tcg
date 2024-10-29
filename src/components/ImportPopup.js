import React, { useState } from "react";
import FullView from "./FullView";

const ImportPopup = ({
  importedDeck,
  handleSaveImportedDeck,
  setShowImportPopup,
  deckName,
  setDeckName,
}) => {
  return (
    <div className="import-popup">
      <h2>Import Deck</h2>
      <input
        type="text"
        placeholder="Enter deck name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <div className="imported-deck-list">
        <FullView data={importedDeck} handleCardClick={() => {}} />
      </div>
      <div className="import-popup-buttons">
        <button onClick={handleSaveImportedDeck}>Save</button>
        <button onClick={() => setShowImportPopup(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default ImportPopup;
