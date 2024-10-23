import React from "react";

const MidView = ({ data, handleCardClick }) => {
  return (
    <>
      {data.map((card, index) => {
        const inDeckCount = parseInt(card["Total"], 10) || 0;

        return (
          <div className="mid-card" key={index}>
            <img
              src={card["Image"]}
              alt={card["Card"]}
              className="mid-card-image"
            />
            <div className="mid-card-details">
              <div className="mid-card-name">{card["Card"]}</div>
              <div className="mid-card-set">{card["Number"]}</div>
              <div className="mid-card-count">
                {card["Have"]} / {inDeckCount}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MidView;
