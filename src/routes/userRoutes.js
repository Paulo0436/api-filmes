const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Buscar todos os usuários
router.get('/', userController.listarUsuarios);

// Buscar usuário por ID
router.get('/:id', userController.buscarUsuarioPorId);

// Atualizar usuário
router.put('/:id', userController.atualizarUsuario);

// Deletar usuário
router.delete('/:id', userController.deletarUsuario);

module.exports = router;
