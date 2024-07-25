// Dice roll function
export const rollDice = (setDiceRoll, addToActivityLog, activePlayer, gameOver) => {
  if (gameOver) return; // Do nothing if the game is over
  const roll = Math.floor(Math.random() * 6) + 1;
  setDiceRoll(roll);
  addToActivityLog(`${activePlayer === 'player' ? 'You' : 'Computer'} rolled ${roll}`, 'dice-roll-message', activePlayer);
  return roll;
};

// Move player function
export const movePlayer = (dice, playerPosition, setPlayerPosition, snakeMappings, ladderMappings, setActivePlayer, addToActivityLog, setGameOver) => {
  let newPosition = playerPosition + dice;
  if (newPosition > 100) {
    addToActivityLog(`You need an exact roll to reach 100. Try again!`, 'dice-roll-message', 'player');
    setActivePlayer('computer');
    return;
  }
  if (snakeMappings.has(newPosition)) {
    newPosition = snakeMappings.get(newPosition);
    addToActivityLog(`Oh No, Snake caught you! Move to ${newPosition}`, 'snake-message', 'player');
  } else if (ladderMappings.has(newPosition)) {
    newPosition = ladderMappings.get(newPosition);
    addToActivityLog(`Hurry, Climb Up!!! you are now on ${newPosition}`, 'ladder-message', 'player');
  } else {
    addToActivityLog(`You moved to ${newPosition}`, 'dice-roll-message', 'player');
  }
  setPlayerPosition(newPosition);
  if (newPosition === 100) {
    addToActivityLog('Congratulations! You won!', 'winner', 'player');
    setGameOver(true); // End game if player reaches 100
  } else {
    setActivePlayer('computer'); // Switch to computer
  }
};

// Move computer function
export const moveComputer = (dice, computerPosition, setComputerPosition, snakeMappings, ladderMappings, setActivePlayer, addToActivityLog, setGameOver) => {
  let newPosition = computerPosition + dice;
  if (newPosition > 100) {
    addToActivityLog(`Computer needs an exact roll to reach 100. Try again!`, 'dice-roll-message', 'computer');
    setActivePlayer('player');
    return;
  }
  if (snakeMappings.has(newPosition)) {
    newPosition = snakeMappings.get(newPosition);
    addToActivityLog(`Oh No, Computer caught by Snake! Move to ${newPosition}`, 'snake-message', 'computer');
  } else if (ladderMappings.has(newPosition)) {
    newPosition = ladderMappings.get(newPosition);
    addToActivityLog(`Hurry, Climb Up!!! Computer is now on ${newPosition}`, 'ladder-message', 'computer');
  } else {
    addToActivityLog(`Computer moved to ${newPosition}`, 'dice-roll-message', 'computer');
  }
  setComputerPosition(newPosition);
  if (newPosition === 100) {
    addToActivityLog('Computer won!', 'winner', 'computer');
    setGameOver(true); // End game if computer reaches 100
  } else {
    setActivePlayer('player'); // Switch to player
  }
};

export const addToActivityLog = (activityLog, setActivityLog, message, type, player) => {
  const logEntryClass = player === 'player' ? 'player-message' : 'computer-message';
  setActivityLog((prevLog) => [{ message, type, logEntryClass }, ...prevLog]);
};
