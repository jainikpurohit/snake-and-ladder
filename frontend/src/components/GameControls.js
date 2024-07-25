import React from 'react';
import PropTypes from 'prop-types';
import './css/GameControls.css';

/**
 * Provides game control buttons for loading, saving, and resetting the game.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onLoadGame - Callback for loading a game.
 * @param {function} props.onSaveGame - Callback for saving a game.
 * @param {function} props.onResetGame - Callback for resetting the game.
 * @returns {JSX.Element} The rendered component.
 */
const GameControls = ({ onLoadGame, onSaveGame, onResetGame }) => (
  <div className="game-controls">
    <button className="game-control-button" onClick={onLoadGame}>Load Game</button>
    <button className="game-control-button" onClick={onSaveGame}>Save Game</button>
    <button className="game-control-button" onClick={onResetGame}>Reset Game</button>
  </div>
);

GameControls.propTypes = {
  onLoadGame: PropTypes.func.isRequired,
  onSaveGame: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
};

export default GameControls;
