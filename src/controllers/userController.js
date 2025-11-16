exports.listarUsuarios = async (req, res) => {
    res.json({ message: "Listando todos os usuários..." });
  };
  
  exports.buscarUsuarioPorId = async (req, res) => {
    res.json({ message: `Buscando usuário com ID ${req.params.id}...` });
  };
  
  exports.atualizarUsuario = async (req, res) => {
    res.json({ message: `Atualizando usuário com ID ${req.params.id}...` });
  };
  
  exports.deletarUsuario = async (req, res) => {
    res.json({ message: `Deletando usuário com ID ${req.params.id}...` });
  };
  