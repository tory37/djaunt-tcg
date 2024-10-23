import React, { useRef, useEffect, useState } from 'react';

import '../../styles/Carousel.css';

const Carousel = ({ images, vertical = false }) => {
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0); // Track the center card index
  const scrollAmount = 5; // Adjust scroll speed

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        [vertical ? 'left' : 'top']: direction * scrollAmount,
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

    const leftEdge = carouselRef.current.querySelector(`.left-edge${vertical ? '.vertical' : ''}`);
    const rightEdge = carouselRef.current.querySelector(`.right-edge${vertical ? '.vertical' : ''}`);

    if (leftEdge && rightEdge) {
      leftEdge.addEventListener('mouseenter', () => handleMouseEnter(vertical ? -1 : 1));
      leftEdge.addEventListener('mouseleave', () => clearInterval());
      rightEdge.addEventListener('mouseenter', () => handleMouseEnter(vertical ? 1 : -1));
      rightEdge.addEventListener('mouseleave', () => clearInterval());
    }

    carouselRef.current && carouselRef.current.addEventListener('scroll', updateCenterIndex); // Update center index on scroll

    return () => {
      leftEdge && leftEdge.removeEventListener('mouseenter', () => handleMouseEnter(vertical ? -1 : 1));
      leftEdge && leftEdge.removeEventListener('mouseleave', () => clearInterval());
      rightEdge && rightEdge.removeEventListener('mouseenter', () => handleMouseEnter(vertical ? 1 : -1));
      rightEdge && rightEdge.removeEventListener('mouseleave', () => clearInterval());
      carouselRef.current && carouselRef.current.removeEventListener('scroll', updateCenterIndex); // Clean up
    };
  }, []);

  return (
    <div className={`carousel-container ${vertical ? 'vertical' : ''}`}>
      <div className={`carousel ${vertical ? 'vertical' : ''}`} ref={carouselRef}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Card ${index}`} className="carousel-image" />
        ))}
      </div>
      <div className={`right-edge ${vertical ? 'vertical' : ''}`} />
      <div className={`center-card ${vertical ? 'vertical' : ''}`}>
        <img src={images[centerIndex]} alt={`Center Card ${centerIndex}`} className="center-image" />
      </div>
      <div className={`arrow ${vertical ? 'arrow-left' : 'arrow-up'}`} onClick={() => handleScroll(vertical ? -1 : 1)}>&#9660;</div>
      <div className={`arrow ${vertical ? 'arrow-right' : 'arrow-down'}`} onClick={() => handleScroll(vertical ? 1 : -1)}>&#9650;</div>
    </div>
  );
};

export default Carousel;