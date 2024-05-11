const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Logging Middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/requests.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
