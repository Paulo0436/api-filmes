const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.listarFilmes);
router.get('/:id', movieController.buscarFilmePorId);
router.post('/', movieController.criarFilme);
router.put('/:id', movieController.atualizarFilme);
router.delete('/:id', movieController.deletarFilme);

module.exports = router;

