import React, { useEffect } from 'react';

const FullView = ({ data, handleCardClick }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data.map((card, index) => {
        const setNameParts = card.set ? card.set.split('-') : ['', ''];
        const firstPart = setNameParts[0];
        const secondPart = setNameParts[1] ? `#${setNameParts[1]}` : '';

        return (
          <div className="card" key={index}>
            <div className="card-image-container">
              {[...Array(card.quantity)].map((_, i) => (
                <img
                  key={i}
                  src={`https://images.digimoncard.io/images/cards/${card.set}.jpg`}
                  alt={card.name}
                  className="card-image"
                  style={{ 
                    marginTop: `${i > 0 ? -200 : 0}px`, 
                    zIndex: i,
                  }}
                  onClick={handleCardClick(card)}
                />
              ))}
            </div>
            <div className="card-details-container">
              <div className="card-name">{card.name}</div>
              <div className="card-count">{card.quantity}</div>
              <div className="card-set">{firstPart}</div>
              <div className="card-set-number">{secondPart}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FullView;