const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de registro
router.post('/register', authController.registrarUsuario);

// Rota de login
router.post('/login', authController.loginUsuario);

module.exports = router;

