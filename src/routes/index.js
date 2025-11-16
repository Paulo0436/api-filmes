const express = require('express');
const router = express.Router();

// Aqui futuramente:
// router.use('/filmes', require('./filmes.routes'));

router.get('/', (req, res) => {
  res.json({ message: 'API Filmes v1 funcionando!' });
});

module.exports = router;
