import React from 'react';
import CardCarousel from './CardCarousel'; // Assuming CardCarousel is a separate component

const CarouselView = ({ getSpreadDeck, drawnImages, handleDraw }) => {
  return (
    <CardCarousel getSpreadDeck={getSpreadDeck} drawnImages={drawnImages} handleDraw={handleDraw} />
  );
};

export default CarouselView;