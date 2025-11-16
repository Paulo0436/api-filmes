
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  genero: { type: String, required: true, trim: true },
  ano: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);

