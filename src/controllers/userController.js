const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Criar Usuário

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Este email já está cadastrado!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário!" });
  }
};


// Listar Usuários

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select("-senha");
    res.json(usuarios);

  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários!" });
  }
};


// Buscar Usuário por ID

exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select("-senha");

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json(usuario);

  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro ao buscar usuário!" });
  }
};


// Atualizar Usuário

exports.atualizarUsuario = async (req, res) => {
  try {
    const dadosAtualizar = { ...req.body };

    // Se alterar senha → criptografar
    if (dadosAtualizar.senha) {
      dadosAtualizar.senha = await bcrypt.hash(dadosAtualizar.senha, 10);
    }

    const usuarioAtualizado = await User.findByIdAndUpdate(
      req.params.id,
      dadosAtualizar,
      { new: true }
    ).select("-senha");

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json({
      message: "Usuário atualizado com sucesso!",
      usuario: usuarioAtualizado
    });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário!" });
  }
};


// Deletar Usuário

exports.deletarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json({ message: "Usuário deletado com sucesso!" });

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro ao deletar usuário!" });
  }
};
