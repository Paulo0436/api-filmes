const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: "Acesso negado! Token não encontrado." });
    }

    // O token deve vir no formato: "Bearer token_aqui"
    const tokenLimpo = token.replace("Bearer ", "");

    const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

    req.userId = decoded.id; // Passa o ID para as próximas rotas

    next();

  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(401).json({ message: "Token inválido ou expirado!" });
  }
};
