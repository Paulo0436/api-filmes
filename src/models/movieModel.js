
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  genero: { type: String, required: true },
  ano: { type: Number, required: true }
});

module.exports = mongoose.model("Movie", movieSchema);


