import React, { useState } from "react";
import "../styles/EditView.css";

const EditView = ({ data, onSave, getImageUrl }) => {
  const [cards, setCards] = useState(data);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="edit-view">
      {cards.map((card, index) => (
        <div key={index} className="card-edit-form">
          <input
            value={card.Card}
            onChange={(e) => handleInputChange(index, "Card", e.target.value)}
            placeholder="Card Name"
          />
          <input
            type="string"
            value={card.Number}
            onChange={(e) => handleInputChange(index, "Number", e.target.value)}
            placeholder="Card Number"
          />
          {card.Number && (
            <img
              src={getImageUrl(card.Number)}
              alt="Card Preview"
              className="card-preview"
              onClick={() => setSelectedImage(getImageUrl(card.Number))}
            />
          )}
          <input
            type="number"
            value={card.Total}
            onChange={(e) => handleInputChange(index, "Total", e.target.value)}
            placeholder="Total"
          />
          <input
            type="number"
            value={card.Have}
            onChange={(e) => handleInputChange(index, "Have", e.target.value)}
            placeholder="Have"
            max={card.Total} // Ensure "Have" does not exceed "Total"
          />
          <input
            type="number"
            value={card.Need}
            placeholder="Need"
            readOnly // Make "Need" non-editable
          />
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
