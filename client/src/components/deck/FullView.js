import React, { useEffect } from 'react';

const FullView = ({ data, handleCardClick }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data.map((card, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-image-container">
              {[...Array(card.quantity)].map((_, i) => (
                <img
                  key={i}
                  src={card.image}
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
              <div className="card-set">{card.set}</div>
              <div className="card-set-number">{card.nmmber}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FullView;