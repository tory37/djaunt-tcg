const mongoose = require('mongoose');

const digimonDeckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeckCard' }],
  created_at: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('DigimonDeck', digimonDeckSchema);