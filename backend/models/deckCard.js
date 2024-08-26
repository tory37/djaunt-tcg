const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckCardSchema = new Schema({
  deck_id: { type: Schema.Types.ObjectId, ref: 'DigimonDeck', required: true },
  card_id: { type: Schema.Types.ObjectId, ref: 'DigimonCard', required: true },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('DeckCard', deckCardSchema);