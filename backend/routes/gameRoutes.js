const express = require('express');
const router = express.Router();
const GameState = require('../models/GameState');

// Save game state
router.post('/save', async (req, res) => {
  try {
    const { gameId, playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog } = req.body;
    // Error Handling - Check for gameId
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
router.get('/load/:gameId', async (req, res) => {
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

module.exports = router;
