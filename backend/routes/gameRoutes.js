const express = require('express');
const router = express.Router();
const GameState = require('../models/GameState');

/**
 * @route POST /save
 * @description Save or update the game state
 * @access Public
 * @body {Object} req.body - The game state object to be saved, which should include:
 *   - {String} gameId - Unique identifier for the game
 *   - {Number} playerPosition - The current position of the player
 *   - {Number} computerPosition - The current position of the computer
 *   - {String} activePlayer - Indicates whether 'player' or 'computer' is the active player
 *   - {Number} diceRoll - The result of the last dice roll
 *   - {Boolean} gameOver - Indicates if the game is over
 *   - {Array} activityLog - The log of game activities
 * @returns {Object} - The saved or updated game state object
 * @throws {400} - If the gameId is missing
 * @throws {500} - If there is an error saving the game state
 */
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

/**
 * @route GET /load/:gameId
 * @description Retrieve the game state based on the game ID
 * @access Public
 * @param {String} gameId - The unique identifier for the game, provided as a route parameter
 * @returns {Object} - The game state object
 * @throws {404} - If the game state is not found
 * @throws {500} - If there is an error retrieving the game state
 */
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
