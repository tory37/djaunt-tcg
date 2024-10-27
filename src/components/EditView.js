import React, { useState, useEffect } from "react";
import "../styles/EditView.css";
import { FaPlus, FaCheck, FaMinus } from "react-icons/fa"; // Import icons

const EditView = ({ data, onSave, getImageUrl }) => {
  const [cards, setCards] = useState(data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState({}); // Track view mode for each card

  const handleInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;

    // Recalculate "Need" whenever "Have" or "Total" changes
    if (field === "Have" || field === "Total") {
      updatedCards[index]["Need"] =
        updatedCards[index]["Total"] - updatedCards[index]["Have"];
    }

    setCards(updatedCards);
  };

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

  const handleSave = () => {
    onSave(cards);
  };

  const checkImageExists = (url, callback) => {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  };

  useEffect(() => {
    cards.forEach((card, index) => {
      const imageUrl = getImageUrl(card.Number);
      checkImageExists(imageUrl, (exists) => {
        setViewMode((prev) => ({
          ...prev,
          [index]: exists ? "image" : "inputs",
        }));
      });
    });
  }, [cards]);

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
                onClick={() => setSelectedImage(getImageUrl(card.Number))}
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
              <button
                onClick={() =>
                  setViewMode((prev) => ({
                    ...prev,
                    [index]: "inputs",
                  }))
                }
              >
                Toggle View
              </button>
            </>
          ) : (
            <>
              <input
                value={card.Card}
                onChange={(e) =>
                  handleInputChange(index, "Card", e.target.value)
                }
                placeholder="Card Name"
              />
              <input
                type="string"
                value={card.Number}
                onChange={(e) =>
                  handleInputChange(index, "Number", e.target.value)
                }
                placeholder="Card Number"
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
              <button
                onClick={() =>
                  setViewMode((prev) => ({
                    ...prev,
                    [index]: "image",
                  }))
                }
              >
                Toggle View
              </button>
            </>
          )}
          <button onClick={() => deleteCard(index)}>Delete</button>
        </div>
      ))}
      <button onClick={addCard}>Add Card</button>
      <button onClick={handleSave}>Save</button>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full Screen Card" />
        </div>
      )}
    </div>
  );
};

export default EditView;
