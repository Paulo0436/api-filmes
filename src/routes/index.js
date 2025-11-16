const express = require('express');
const router = express.Router();
const movieRoutes = require('./movieRoutes');


router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API Filmes v1 funcionando!',
    version: '1.0.0'
  });
});

router.use('/movies', movieRoutes);

module.exports = router;

