import React from 'react';
import PropTypes from 'prop-types';
import './css/DiceControls.css';

/**
 * Provides dice controls for rolling the dice and displaying the result.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onRollDice - Callback for rolling the dice.
 * @param {number|null} props.playerDiceRoll - The result of the player's dice roll.
 * @param {boolean} props.disabled - Whether the button should be disabled.
 * @returns {JSX.Element} The rendered component.
 */
const DiceControls = ({ onRollDice, playerDiceRoll, disabled }) => (
  <div className="App-dice-controls">
    <button className="dice-button" onClick={onRollDice} disabled={disabled}>Roll Dice</button>
    {playerDiceRoll !== null && (
      <div className="dice-roll-display">
        {playerDiceRoll}
      </div>
    )}
  </div>
);

DiceControls.propTypes = {
  onRollDice: PropTypes.func.isRequired,
  playerDiceRoll: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
};

export default DiceControls;
