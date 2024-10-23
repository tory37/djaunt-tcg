import React from 'react';

const ListView = ({ data }) => {
  return (
    <>
      {data.map((card, index) => {
        return (
          <div className="list-card" key={index}>
            <div className="list-card-name">{card.name}</div>
            <div className="vertical-line"></div>
            <div className="list-card-set">
              <span className="set-label">Set:</span> {card.set}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-set-number">
              <span className="set-number-label">#:</span> {card.number}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-count">
              <span className="have-label">Have:</span> {card.quantity}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListView;