// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, nome: user.nome },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

exports.register = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email já cadastrado' });

    const user = new User({ nome, email, senha });
    await user.save();

    const token = generateToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const isMatch = await user.compararSenha(senha);
    if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};
