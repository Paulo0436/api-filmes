const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

// Listar Filmes
router.get('/', authMiddleware, movieController.listarFilmes);

// Buscar Filme por ID
router.get('/:id', authMiddleware, movieController.buscarFilmePorId);

// Criar Filme
router.post('/', authMiddleware, movieController.criarFilme);

// Atualizar Filme
router.put('/:id', authMiddleware, movieController.atualizarFilme);

// Deletar Filme
router.delete('/:id', authMiddleware, movieController.deletarFilme);

module.exports = router;

