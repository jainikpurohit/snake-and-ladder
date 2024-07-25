const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configureMiddleware = require('./config/middleware');
const errorHandler = require('./middleware/errorHandler');
const gameRoutes = require('./routes/gameRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
configureMiddleware(app);

// Routes
app.use(gameRoutes);

// Error Handling
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
