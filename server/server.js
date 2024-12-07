// Require
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');

// Initialize express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/movies', require('./routes/moviesRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewsRoutes'));

const { PORT } = process.env;

// Connect to database
connectDB().then(() => {
  // Run server
  app.listen(PORT, () => console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`))
});