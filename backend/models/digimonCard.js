const mongoose = require('mongoose');

const digimonCardSchema = new mongoose.Schema({
  set: { type: String, required: true },
  color: String,
  name: String,
  level: Number,
  type: String,
  number: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('DigimonCard', digimonCardSchema);