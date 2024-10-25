import React from 'react';

const MidView = ({ data }) => {
  return (
    <>
      {data.map((card, index) => {
        return (
          <div className="mid-card" key={index}>
            <img src={`https://images.digimoncard.io/images/cards/${card.set}.jpg`} alt={card.name} className="mid-card-image" />
            <div className="mid-card-details">
              <div className="mid-card-name">{card.name}</div>
              <div className="mid-card-set">{card.set}</div>
              <div className="mid-card-count">{card.quantity}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MidView;