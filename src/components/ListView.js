import React from "react";

const ListView = ({ data }) => {
  return (
    <>
      {data.map((card, index) => {
        const totalCount = parseInt(card["Total"], 10) || 0;
        const haveCount = parseInt(card["Have"], 10) || 0;
        const needCount = parseInt(card["Need"], 10) || 0;

        return (
          <div className="list-card" key={index}>
            <div className="list-card-name">{card["Card"]}</div>
            <div className="vertical-line"></div>
            <div className="list-card-set">
              <span className="set-label">Set:</span> {card["Number"]}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-set-number">
              <span className="set-number-label">Total:</span> {totalCount}
            </div>
            <div className="vertical-line"></div>
            <div className="list-card-count">
              <span className="have-label">Have:</span> {haveCount}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListView;
