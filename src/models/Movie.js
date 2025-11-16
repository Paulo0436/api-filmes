const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  director: { type: String },
  year: { type: Number },
  rating: { type: Number, min: 0, max: 10 },
  genres: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
