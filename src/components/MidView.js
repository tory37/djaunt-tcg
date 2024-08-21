import React from 'react';

const MidView = ({ data, handleCardClick }) => {
  return (
    <>
      {data.map((card, index) => {
        const inDeckCount = parseInt(card['In Deck'], 10) || 0;

        return (
          <div className="mid-card" key={index}>
            <img src={`https://images.digimoncard.io/images/cards/${card['Card Set']}.jpg`} alt={card['Card Name']} className="mid-card-image" />
            <div className="mid-card-details">
              <div className="mid-card-name">{card['Card Name']}</div>
              <div className="mid-card-set">{card['Card Set']}</div>
              <div className="mid-card-count">{card['Have']} / {inDeckCount}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MidView;