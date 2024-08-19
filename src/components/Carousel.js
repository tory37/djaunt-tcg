import React, { useRef, useEffect } from 'react';

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);
  const scrollAmount = 5; // Adjust scroll speed

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
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

    return () => {
      if (leftEdge && rightEdge) {
        leftEdge.removeEventListener('mouseenter', () => handleMouseEnter(-1));
        leftEdge.removeEventListener('mouseleave', () => clearInterval());
        rightEdge.removeEventListener('mouseenter', () => handleMouseEnter(1));
        rightEdge.removeEventListener('mouseleave', () => clearInterval());
      }
    };
  }, []);

  return (
    <div className="carousel-container">
      <div className="left-edge" />
      <div className="carousel" ref={carouselRef}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Card ${index}`} className="carousel-image" />
        ))}
      </div>
      <div className="right-edge" />
    </div>
  );
};

export default Carousel;