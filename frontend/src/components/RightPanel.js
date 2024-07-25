import React from 'react';
import DiceControls from './DiceControls';
import GameControls from './GameControls';
import './css/RightPanel.css';
import PropTypes from 'prop-types';

const RightPanel = ({ onRollDice, playerDiceRoll, disabled, onLoadGame, onSaveGame, onResetGame }) => (
  <div className="app-right-panel">
    <DiceControls
      onRollDice={onRollDice}
      playerDiceRoll={playerDiceRoll}
      disabled={disabled}
    />
    <div className="player-box">You</div>
    <div className="computer-box">Computer</div>
    <GameControls
      onLoadGame={onLoadGame}
      onSaveGame={onSaveGame}
      onResetGame={onResetGame}
    />
  </div>
);

RightPanel.propTypes = {
  onRollDice: PropTypes.func.isRequired,
  diceRoll: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  onLoadGame: PropTypes.func.isRequired,
  onSaveGame: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
  activePlayer: PropTypes.string.isRequired,
};

export default RightPanel;
