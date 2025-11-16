require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const connectDB = require('./src/config/database');

// Rotas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');

// Swagger
const { swaggerUi, swaggerDocument } = require('./src/config/swagger');

connectDB();

const app = express();

// Middlewares essenciais
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
