import React from 'react';

const ListView = ({ data }) => {
  return (
    <>
      {data.map((card, index) => {
        const inDeckCount = parseInt(card['In Deck'], 10) || 0;
        const setNameParts = card['Card Set'] ? card['Card Set'].split('-') : ['', ''];
        const firstPart = setNameParts[0];
        const secondPart = setNameParts[1] ? `${setNameParts[1]}` : '';

        return (
          <div className="list-card" key={index}>
            <div className="list-card-name">{card['Card Name']}</div>
            <div className="vertical-line"></div>
            <div className="list-card-set">
              <span className="set-label">Set:</span> {firstPart}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-set-number">
              <span className="set-number-label">#:</span> {secondPart}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-count">
              <span className="have-label">Have:</span> {card['Have']} / <span className="in-deck-label">{inDeckCount}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListView;