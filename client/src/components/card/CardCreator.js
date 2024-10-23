import React, { useState, useEffect } from 'react';
import { getAllCards, createCard, updateCard } from '../../api/Digimon';
import '../../styles/CardCreator.css';
import ColorSelector from './ColorSelector';
import SetSelector from './SetSelector';
import LevelSelector from './LevelSelector';

const CardCreator = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formData, setFormData] = useState({
    set: '',
    colors: [],
    name: '',
    level: '',
    type: '',
    number: ''
  });

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getAllCards();
      setCards(fetchedCards);
    };
    fetchCards();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (colors) => {
    setFormData({ ...formData, colors });
  };

  const handleCardSelect = (e) => {
    const cardId = e.target.value;
    const card = cards.find((c) => c._id === cardId);
    setSelectedCard(card);
    setFormData(card || {
      set: '',
      colors: [],
      name: '',
      level: '',
      type: '',
      number: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCard) {
      await updateCard(selectedCard._id, formData);
    } else {
      await createCard(formData);
    }
    setSelectedCard(null);
    setFormData({
      set: '',
      colors: [],
      name: '',
      level: '',
      type: '',
      number: ''
    });
  };

  const handleSetSelect = (set) => {
    setFormData({ ...formData, set });
  };

  const handleLevelSelect = (level) => {
    setFormData({ ...formData, level });
  };

  return (
    <div className="card-creator-container">
      <h2>Card Creator</h2>
      <form className="card-creator-form" onSubmit={handleSubmit}>
        <select onChange={handleCardSelect} value={selectedCard ? selectedCard._id : ''}>
          <option value="">Create New Card</option>
          {cards.map((card) => (
            <option key={card._id} value={card._id}>
              {card.name} ({card.number})
            </option>
          ))}
        </select>
        <SetSelector selectedSet={formData.set} onSelectSet={handleSetSelect} />
        <LevelSelector selectedLevel={formData.level} onSelectLevel={handleLevelSelect} />
        <ColorSelector colors={['Red', 'Blue', 'Yellow', 'Green', 'Black', 'Purple', 'White']} onChange={handleColorChange} />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Digimon">Digimon</option>
          <option value="Option">Option</option>
          <option value="Tamer">Tamer</option>
          <option value="Digitama">Digitama</option>
        </select>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          placeholder="Number"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CardCreator;