const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Registrar Usuário

exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificação simples
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    // Verifica se o email já está em uso
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já está cadastrado!" });
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar usuário
    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar usuário!" });
  }
};

// Login de Usuário
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Informe email e senha!" });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao realizar login!" });
  }
};
