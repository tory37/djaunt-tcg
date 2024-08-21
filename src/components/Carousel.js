import React, { useRef, useEffect, useState } from 'react';

import '../styles/Carousel.css';

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0); // Track the center card index
  const scrollAmount = 5; // Adjust scroll speed

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateCenterIndex = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const cardWidth = 120; // Assuming each card is 100px wide
      const centerOffset = carousel.clientWidth / 2; // Half of the carousel width
      const centerCard = Math.floor((carousel.scrollLeft + centerOffset) / cardWidth); // Adjusted calculation
      setCenterIndex(centerCard);
    }
  };

  useEffect(() => {
    const handleMouseEnter = (direction) => {
      const interval = setInterval(() => handleScroll(direction), 100);
      return () => clearInterval(interval);
    };

    const leftEdge = carouselRef.current.querySelector('.left-edge');
    const rightEdge = carouselRef.current.querySelector('.right-edge');

    if (leftEdge && rightEdge) {
      leftEdge.addEventListener('mouseenter', () => handleMouseEnter(-1));
      leftEdge.addEventListener('mouseleave', () => clearInterval());
      rightEdge.addEventListener('mouseenter', () => handleMouseEnter(1));
      rightEdge.addEventListener('mouseleave', () => clearInterval());
    }

    carouselRef.current && carouselRef.current.addEventListener('scroll', updateCenterIndex); // Update center index on scroll

    return () => {
      leftEdge && leftEdge.removeEventListener('mouseenter', () => handleMouseEnter(-1));
      leftEdge && leftEdge.removeEventListener('mouseleave', () => clearInterval());
      rightEdge && rightEdge.removeEventListener('mouseenter', () => handleMouseEnter(1));
      rightEdge && rightEdge.removeEventListener('mouseleave', () => clearInterval());
      carouselRef.current && carouselRef.current.removeEventListener('scroll', updateCenterIndex); // Clean up
    };
  }, []);

  return (
    <div className="carousel-container" >
      <div className="left-edge" />
      <div className="carousel" ref={carouselRef}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Card ${index}`} className="carousel-image" />
        ))}
      </div>
      <div className="right-edge" />
      <div className="center-card">
        <img src={images[centerIndex]} alt={`Center Card ${centerIndex}`} className="center-image" />
      </div>
      <div className="arrow arrow-up" onClick={() => handleScroll(-1)}>&#9660;</div>
      <div className="arrow arrow-down" onClick={() => handleScroll(1)}>&#9650;</div>
    </div>
  );
};

export default Carousel;