const mongoose = require('mongoose');
const DigimonCard = require('../models/digimonCard');
const DigimonDeck = require('../models/digimonDeck');
const DeckCard = require('../models/deckCard');
const User = require('../models/user');
const connectDB = require('../config/db');
require('dotenv').config(); // Add this line

const mockData = async () => {
  await connectDB();

  // Clear existing data
  await DigimonCard.deleteMany({});
  await DigimonDeck.deleteMany({});
  await DeckCard.deleteMany({});
  await User.deleteMany({});

  // Create a user
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
  });
  await user.save();

  // Real-world Digimon 2020 TCG data (sample)
  const cards = [
    { set: 'BT1', color: 'Red', name: 'Agumon', level: 3, type: 'Reptile', number: 'BT1-010' },
    { set: 'BT1', color: 'Blue', name: 'Gabumon', level: 3, type: 'Reptile', number: 'BT1-020' },
    { set: 'BT1', color: 'Yellow', name: 'Patamon', level: 3, type: 'Mammal', number: 'BT1-030' },
    { set: 'BT1', color: 'Green', name: 'Palmon', level: 3, type: 'Plant', number: 'BT1-040' },
    { set: 'BT1', color: 'Black', name: 'Agumon (Black)', level: 3, type: 'Reptile', number: 'BT1-050' },
    { set: 'BT1', color: 'Purple', name: 'DemiDevimon', level: 3, type: 'Evil', number: 'BT1-060' },
    // Add more cards as needed
  ];
  const savedCards = await DigimonCard.insertMany(cards);

  // Create decks
  const decks = [
    { name: 'Red Deck', user_id: user._id },
    { name: 'Blue Deck', user_id: user._id },
  ];
  const savedDecks = await DigimonDeck.insertMany(decks);

  // Add multiple instances of cards to each deck
  const deckCards = [];
  for (let i = 0; i < savedCards.length; i++) {
    deckCards.push({ deck_id: savedDecks[0]._id, card_id: savedCards[i]._id, quantity: 10 }); // 10 instances of each card in Red Deck
    deckCards.push({ deck_id: savedDecks[1]._id, card_id: savedCards[i]._id, quantity: 10 }); // 10 instances of each card in Blue Deck
  }
  await DeckCard.insertMany(deckCards);

  console.log('Database populated with mock data');
  mongoose.connection.close();
};

mockData().catch((error) => {
  console.error('Error populating database:', error);
  mongoose.connection.close();
});