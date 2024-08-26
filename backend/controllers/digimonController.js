const DigimonCard = require('../models/digimonCard');
const DigimonDeck = require('../models/digimonDeck');
const DeckCard = require('../models/deckCard');
const User = require('../models/user');

// Example function to get all Digimon cards
const getAllCards = async (req, res) => {
  try {
    const cards = await DigimonCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new Digimon card
const createCard = async (req, res) => {
  try {
    const newCard = new DigimonCard(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Digimon card
const updateCard = async (req, res) => {
  try {
    const updatedCard = await DigimonCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Digimon card
const deleteCard = async (req, res) => {
  try {
    await DigimonCard.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all decks
const getAllDecks = async (req, res) => {
  try {
    const decks = await DigimonDeck.find().populate('user_id').populate({
      path: 'cards',
      populate: {
        path: 'card_id',
        model: 'DigimonCard'
      }
    });
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new deck
const createDeck = async (req, res) => {
  try {
    const newDeck = new DigimonDeck(req.body);
    const savedDeck = await newDeck.save();
    res.status(201).json(savedDeck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a deck
const updateDeck = async (req, res) => {
  try {
    const updatedDeck = await DigimonDeck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a deck
const deleteDeck = async (req, res) => {
  try {
    await DigimonDeck.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a card to a deck
const addCardToDeck = async (req, res) => {
  try {
    const { deckId, cardId, quantity } = req.body;
    const deckCard = new DeckCard({ deck_id: deckId, card_id: cardId, quantity });
    const savedDeckCard = await deckCard.save();
    res.status(201).json(savedDeckCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a card from a deck
const removeCardFromDeck = async (req, res) => {
  try {
    const { deckId, cardId } = req.body;
    await DeckCard.findOneAndDelete({ deck_id: deckId, card_id: cardId });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a deck with card details
const getDeckWithCards = async (req, res) => {
  try {
    const deck = await DigimonDeck.findById(req.params.id).populate('user_id');
    const deckCards = await DeckCard.find({ deck_id: req.params.id }).populate('card_id');
    res.status(200).json({ deck, cards: deckCards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
  getAllDecks,
  createDeck,
  updateDeck,
  deleteDeck,
  addCardToDeck,
  removeCardFromDeck,
  getDeckWithCards,
};