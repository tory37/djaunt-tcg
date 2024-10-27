import React from "react";

const FullView = ({ data, handleCardClick }) => {
  return (
    <>
      {data.map((card, index) => {
        const inDeckCount = parseInt(card["Total"], 10) || 0;

        return (
          <div className="card" key={index} style={{ position: "relative" }}>
            {card["Shared"] && <div className="icon-top-right">🔗</div>}
            <div className="in-deck-count">{inDeckCount}</div>
            <img
              key={`${card["Card"]}-${card["Number"]}`}
              src={card["Image"]}
              alt={card["Card"]}
              className="card-image"
              onClick={handleCardClick(card)}
            />
          </div>
        );
      })}
    </>
  );
};

export default FullView;
