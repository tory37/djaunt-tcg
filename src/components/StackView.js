import React from 'react';
import CardStack from './CardStack'; // Assuming CardStack is a separate component

const StackView = ({ getSpreadDeck, handleCardClick, selectedCard }) => {
  return (
    <CardStack getSpreadDeck={getSpreadDeck} handleCardClick={handleCardClick} selectedCard={selectedCard} />
  );
};

export default StackView;