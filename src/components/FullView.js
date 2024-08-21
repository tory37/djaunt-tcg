import React from 'react';

const FullView = ({ data, handleCardClick }) => {
  return (
    <>
      {data.map((card, index) => {
        const inDeckCount = parseInt(card['In Deck'], 10) || 0;
        const setNameParts = card['Card Set'] ? card['Card Set'].split('-') : ['', ''];
        const firstPart = setNameParts[0];
        const secondPart = setNameParts[1] ? `#${setNameParts[1]}` : '';

        return (
          <div className="card" key={index}>
            <div className="card-image-container">
              {[...Array(inDeckCount)].map((_, i) => (
                <img
                  key={i}
                  src={`https://images.digimoncard.io/images/cards/${card['Card Set']}.jpg`}
                  alt={card['Card Name']}
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
              <div className="card-name">{card['Card Name']}</div>
              <div className="card-count">{card['Have']} / {inDeckCount}</div>
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