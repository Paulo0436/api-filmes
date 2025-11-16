const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas protegidas (exigem token)

// Listar Usuários
router.get('/', authMiddleware, userController.listarUsuarios);

// Buscar um usuário por ID
router.get('/:id', authMiddleware, userController.buscarUsuarioPorId);

// Criar Usuário
router.post('/', authMiddleware, userController.criarUsuario);

// Atualizar Usuário
router.put('/:id', authMiddleware, userController.atualizarUsuario);

// Deletar Usuário
router.delete('/:id', authMiddleware, userController.deletarUsuario);

module.exports = router;

