const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configureMiddleware = require('./config/middleware');
const gameRoutes = require('./routes/gameRoutes');
const mongoose = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
configureMiddleware(app);

// Routes
app.use(gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
