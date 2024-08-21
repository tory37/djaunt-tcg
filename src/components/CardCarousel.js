import React from 'react';
import Carousel from './Carousel';

const CardCarousel = ({ getSpreadDeck, drawnImages, handleDraw }) => {
  return (
    <div className="carousel-container">
      <Carousel images={getSpreadDeck().map(card => card['Image'])} />
      <div className="random-images">
        {drawnImages.map((image, index) => (
          <img key={index} src={image} alt={`Random ${index}`} className="random-image" />
        ))}
      </div>
      <button className="draw-button" onClick={handleDraw}>Draw</button>
    </div>
  );
};

export default CardCarousel;