import mongoose from 'mongoose';

const digimonCardSchema = new mongoose.Schema({
  set: { type: String, required: true },
  colors: [{ type: String, required: true }], // Updated to store an array of colors
  name: String,
  level: Number,
  type: { 
    type: String, 
    enum: ['Digimon', 'Option', 'Tamer', 'Digitama'], 
    required: true 
  },
  number: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('DigimonCard', digimonCardSchema);