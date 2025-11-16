const { body } = require('express-validator');

exports.registerValidation = [
  body('nome').isString().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').exists().withMessage('Senha é obrigatória')
];
