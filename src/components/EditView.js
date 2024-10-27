import React, { useState, useEffect } from "react";
import "../styles/EditView.css";
import {
  FaPlus,
  FaCheck,
  FaMinus,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa"; // Import necessary icons
import useImageModal from "../hooks/useImageModal";

const EditView = ({ data, onSave, getImageUrl }) => {
  const [cards, setCards] = useState(data);
  const [viewMode, setViewMode] = useState({});
  const { selectedImage, handleImageClick, closeModal } = useImageModal();
  const [initialized, setInitialized] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;

    if (field === "Have" || field === "Total") {
      updatedCards[index]["Need"] =
        updatedCards[index]["Total"] - updatedCards[index]["Have"];
    }

    setCards(updatedCards);
  };

  useEffect(() => {
    if (cards.length > 0 && !initialized) {
      cards.forEach((card, index) => {
        setViewMode((prev) => ({ ...prev, [index]: "image" }));
      });
      setInitialized(true);
    }
  }, [cards]);

  const addCard = () => {
    setCards([
      ...cards,
      { Card: "", Number: "", Total: "", Have: "", Need: "" },
    ]);
  };

  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const openTCGPlayer = (cardName) => {
    const baseUrl = "https://www.tcgplayer.com/search";
    const productLine = "digimon-card-game"; // or "union-arena" based on your logic
    const url = `${baseUrl}/${productLine}/product?productLineName=${productLine}&q=${encodeURIComponent(
      cardName
    )}&view=list`;
    window.open(url, "_blank");
  };

  const handleSave = () => {
    onSave(cards);
  };

  return (
    <div className="edit-view">
      {cards.map((card, index) => (
        <div key={index} className="card-edit-form">
          {viewMode[index] === "image" ? (
            <>
              <img
                src={getImageUrl(card.Number)}
                alt="Card Preview"
                className="card-preview"
                onClick={() => handleImageClick(getImageUrl(card.Number))}
              />
              <div className="card-stats-row">
                <div className="card-stat">
                  <FaPlus />
                  <input
                    type="number"
                    value={card.Total}
                    onChange={(e) =>
                      handleInputChange(index, "Total", e.target.value)
                    }
                    placeholder="Total"
                    autoFocus
                  />
                </div>
                <div className="card-stat">
                  <FaCheck />
                  <input
                    type="number"
                    value={card.Have}
                    onChange={(e) =>
                      handleInputChange(index, "Have", e.target.value)
                    }
                    placeholder="Have"
                    max={card.Total}
                  />
                </div>
                <div className="card-stat">
                  <FaMinus />
                  <input
                    type="number"
                    value={card.Need}
                    placeholder="Need"
                    readOnly
                  />
                </div>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => deleteCard(index)}
                  className="icon-button"
                >
                  <FaTrash color="red" />
                </button>
                <button
                  onClick={() =>
                    setViewMode((prev) => ({
                      ...prev,
                      [index]: "inputs",
                    }))
                  }
                  className="icon-button"
                >
                  <FaEye color="gold" />
                </button>
                <button
                  onClick={() => openTCGPlayer(card.Card)}
                  className="icon-button"
                >
                  <FaSearch color="green" />
                </button>
              </div>
            </>
          ) : (
            <div className="card-edit-form-input-view">
              <input
                value={card.Card}
                onChange={(e) =>
                  handleInputChange(index, "Card", e.target.value)
                }
                placeholder="Card Name"
                style={{ marginTop: "100px", marginBottom: "10px" }}
              />
              <input
                type="string"
                value={card.Number}
                onChange={(e) =>
                  handleInputChange(index, "Number", e.target.value)
                }
                placeholder="Card Number"
                style={{ marginBottom: "10px" }}
              />
              <div className="card-stats-row" style={{ marginBottom: "10px" }}>
                <div className="card-stat">
                  <FaPlus />
                  <input
                    type="number"
                    value={card.Total}
                    onChange={(e) =>
                      handleInputChange(index, "Total", e.target.value)
                    }
                    placeholder="Total"
                  />
                </div>
                <div className="card-stat">
                  <FaCheck />
                  <input
                    type="number"
                    value={card.Have}
                    onChange={(e) =>
                      handleInputChange(index, "Have", e.target.value)
                    }
                    placeholder="Have"
                    max={card.Total}
                  />
                </div>
                <div className="card-stat">
                  <FaMinus />
                  <input
                    type="number"
                    value={card.Need}
                    placeholder="Need"
                    readOnly
                  />
                </div>
              </div>
              <div className="card-actions" style={{ marginTop: "auto" }}>
                <button
                  onClick={() => deleteCard(index)}
                  className="icon-button"
                >
                  <FaTrash color="red" />
                </button>
                <button
                  onClick={() =>
                    setViewMode((prev) => ({
                      ...prev,
                      [index]: "image",
                    }))
                  }
                  className="icon-button"
                >
                  <FaEye color="gold" />
                </button>
                <button
                  onClick={() => openTCGPlayer(card.Card)}
                  className="icon-button"
                >
                  <FaSearch color="green" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addCard}>Add Card</button>
      <button onClick={handleSave}>Save</button>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={selectedImage} alt="Full Screen Card" />
        </div>
      )}
    </div>
  );
};

export default EditView;
