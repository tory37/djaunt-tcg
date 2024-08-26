const express = require('express');
const { getAllCards } = require('../controllers/digimonController');
const router = express.Router();
const digimonController = require('../controllers/digimonController');

router.get('/cards', digimonController.getAllCards);
router.post('/cards', digimonController.createCard);
router.put('/cards/:id', digimonController.updateCard);
router.delete('/cards/:id', digimonController.deleteCard);

router.get('/decks', digimonController.getAllDecks);
router.post('/decks', digimonController.createDeck);
router.put('/decks/:id', digimonController.updateDeck);
router.delete('/decks/:id', digimonController.deleteDeck);

router.post('/decks/addCard', digimonController.addCardToDeck);
router.post('/decks/removeCard', digimonController.removeCardFromDeck);
router.get('/decks/:id', digimonController.getDeckWithCards);

module.exports = router;