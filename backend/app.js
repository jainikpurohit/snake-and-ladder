const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/snake-ladder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for the game state
const gameStateSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  playerPosition: Number,
  computerPosition: Number,
  activePlayer: String,
  diceRoll: Number,
  gameOver: Boolean,
  activityLog: Array,
});

const GameState = mongoose.model('GameState', gameStateSchema);

// Save game state
app.post('/save', async (req, res) => {
  try {
    const { gameId, playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog } = req.body;
    if (!gameId) {
      return res.status(400).json({ error: 'Game ID is required' });
    }

    const game = await GameState.findOneAndUpdate(
      { gameId },
      { playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog },
      { new: true, upsert: true }
    );
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// Retrieve game state
app.get('/load/:gameId', async (req, res) => {
  const { gameId } = req.params;

  try {
    const gameState = await GameState.findOne({ gameId });
    if (gameState) {
      res.status(200).json(gameState);
    } else {
      res.status(404).json({ message: 'Game state not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve game state', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
