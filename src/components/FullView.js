import React from "react";
import useImageModal from "../hooks/useImageModal";

const FullView = ({ data, handleCardClick }) => {
  const { selectedImage, handleImageClick, closeModal } = useImageModal();

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
              onClick={() => handleImageClick(card["Image"])}
            />
          </div>
        );
      })}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={selectedImage} alt="Full Screen Card" />
        </div>
      )}
    </>
  );
};

export default FullView;
