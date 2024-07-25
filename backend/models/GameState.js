const mongoose = require('mongoose');

// Define a schema for storing game state in mongo db
const gameStateSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  playerPosition: Number,
  computerPosition: Number,
  activePlayer: String,
  diceRoll: Number,
  gameOver: Boolean,
  activityLog: Array,
});

// Create a model for the game state
const GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;
