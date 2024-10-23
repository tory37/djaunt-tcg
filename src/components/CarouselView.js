import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const CarouselView = ({ data }) => {
  const [drawnImages, setDrawnImages] = useState([]);

  const handleDraw = () => {
    const randomImages = [];
    const availableImages = getSpreadDeck().map((card) => card["Image"]);

    while (randomImages.length < 5) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const randomImage = availableImages[randomIndex];
      if (!randomImages.includes(randomImage)) {
        randomImages.push(randomImage);
      }
    }

    setDrawnImages(randomImages);
  };

  const getSpreadDeck = () => {
    return data.flatMap((card) => {
      const inDeckCount = parseInt(card["Total"], 10) || 0;
      return Array.from({ length: inDeckCount }, () => card);
    });
  };

  useEffect(() => {
    handleDraw(); // Automatically draw images when the component mounts
  }, [data]);

  return (
    <>
      <Carousel images={getSpreadDeck().map((card) => card["Image"])} />
      <div className="random-images">
        {drawnImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Random ${index}`}
            className="random-image"
          />
        ))}
      </div>
      <button className="draw-button" onClick={handleDraw}>
        Draw
      </button>
    </>
  );
};

export default CarouselView;
