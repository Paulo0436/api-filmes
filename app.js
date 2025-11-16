require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./src/config/database");
const authRoutes = require('./src/routes/authRoutes');

connectDB();

const apiRoutes = require('./routes');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/v1', apiRoutes);
app.use('/api/v1/auth', authRoutes);


module.exports = app;
