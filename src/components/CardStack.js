import React from 'react';

const CardStack = ({ getSpreadDeck, handleCardClick, selectedCard }) => {
  return (
    <>
      <div className="stack-container">
        {getSpreadDeck().map((card, index) => (
          <div key={`${card['Card Name']}-${index}`} className="stack-card">
            <img
              src={card['Image']}
              alt={card['Card Name']}
              onClick={handleCardClick(card)}
              className="stack-card-image"
            />
          </div>
        ))}
      </div>
      <div className="selected-card">
        {selectedCard ? (
          <img src={selectedCard['Image']} alt={selectedCard['Card Name']} className="large-card-image" />
        ) : (
          <div className="select-card-placeholder">Select a card</div>
        )}
      </div>
    </>
  );
};

export default CardStack;