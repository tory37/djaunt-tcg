import React, { useState, useEffect } from "react";
import "../styles/EditView.css";
import {
  FaPlus,
  FaCheck,
  FaMinus,
  FaTrash,
  FaEye,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa"; // Import necessary icons
import useImageModal from "../hooks/useImageModal";

const EditView = ({ data, onSave, getImageUrl }) => {
  const [cards, setCards] = useState(data);
  const [viewMode, setViewMode] = useState({});
  const [isDirty, setIsDirty] = useState(false); // Track if changes have been made
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
    setIsDirty(true); // Mark as dirty when a change is made
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
    setIsDirty(true); // Mark as dirty when a new card is added
  };

  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    setIsDirty(true); // Mark as dirty when a card is deleted
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ""; // Required for Chrome to show the warning dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

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
            </>
          ) : (
            <>
              <input
                value={card.Card}
                onChange={(e) =>
                  handleInputChange(index, "Card", e.target.value)
                }
                placeholder="Card Name"
                style={{ marginBottom: "10px" }}
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
            </>
          )}
          <div className="card-stats-row">
            <div className="card-stat">
              <FaPlus />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaArrowUp
                  color="green"
                  onClick={() =>
                    handleInputChange(index, "Total", card.Total + 1)
                  }
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="number"
                  value={card.Total}
                  onChange={(e) =>
                    handleInputChange(index, "Total", e.target.value)
                  }
                  placeholder="Total"
                  style={{ textAlign: "center" }}
                />
                <FaArrowDown
                  color="red"
                  onClick={() =>
                    handleInputChange(index, "Total", card.Total - 1)
                  }
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="card-stat">
              <FaCheck />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaArrowUp
                  color="green"
                  onClick={() =>
                    handleInputChange(index, "Have", card.Have + 1)
                  }
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="number"
                  value={card.Have}
                  onChange={(e) =>
                    handleInputChange(index, "Have", e.target.value)
                  }
                  placeholder="Have"
                  max={card.Total}
                  style={{ textAlign: "center" }}
                />
                <FaArrowDown
                  color="red"
                  onClick={() =>
                    handleInputChange(index, "Have", card.Have - 1)
                  }
                  style={{ cursor: "pointer" }}
                />
              </div>
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
            <button onClick={() => deleteCard(index)} className="icon-button">
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
