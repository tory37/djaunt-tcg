import React from "react";
import useImageModal from "../hooks/useImageModal";

const MidView = ({ data, handleCardClick }) => {
  const { selectedImage, handleImageClick, closeModal } = useImageModal();

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
              onClick={() => handleImageClick(card["Image"])}
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
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={selectedImage} alt="Full Screen Card" />
        </div>
      )}
    </>
  );
};

export default MidView;
