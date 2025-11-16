const Movie = require('../models/movieModel');

// GET /movies
exports.listarFilmes = async (req, res) => {
  try {
    const filmes = await Movie.find();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar filmes.' });
  }
};

// GET /movies/:id
exports.buscarFilmePorId = async (req, res) => {
  try {
    const filme = await Movie.findById(req.params.id);

    if (!filme) {
      return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    res.json(filme);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar filme.' });
  }
};

// POST /movies
exports.criarFilme = async (req, res) => {
  try {
    const { nome, genero, ano } = req.body;

    const novoFilme = await Movie.create({ nome, genero, ano });

    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar filme.' });
  }
};

// PUT /movies/:id
exports.atualizarFilme = async (req, res) => {
  try {
    const { nome, genero, ano } = req.body;

    const filmeAtualizado = await Movie.findByIdAndUpdate(
      req.params.id,
      { nome, genero, ano },
      { new: true }
    );

    if (!filmeAtualizado) {
      return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    res.json(filmeAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar filme.' });
  }
};

// DELETE /movies/:id
exports.deletarFilme = async (req, res) => {
  try {
    const filme = await Movie.findByIdAndDelete(req.params.id);

    if (!filme) {
      return res.status(404).json({ erro: 'Filme não encontrado.' });
    }

    res.json({ mensagem: 'Filme removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover filme.' });
  }
};
