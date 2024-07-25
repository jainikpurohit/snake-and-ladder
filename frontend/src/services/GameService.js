import axios from 'axios';

export const loadGame = async (gameId, setGameId, setPlayerPosition, setComputerPosition, setActivePlayer, setDiceRoll, setGameOver, setActivityLog, addToActivityLog) => {
  try {
    const response = await axios.get(`http://localhost:5000/load/${gameId}`);
    const data = response.data;
    setGameId(gameId);
    setPlayerPosition(data.playerPosition);
    setComputerPosition(data.computerPosition);
    setActivePlayer(data.activePlayer);
    setDiceRoll(data.diceRoll);
    setGameOver(data.gameOver);
    setActivityLog(data.activityLog);
    addToActivityLog(`Game with ID ${gameId} loaded successfully.`, 'info-message', 'system');
  } catch (error) {
    console.error('Failed to load game:', error);
  }
};

export const saveGame = async (gameId, playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog, addToActivityLog) => {
  try {
    await axios.post('http://localhost:5000/save', {
      gameId,
      playerPosition,
      computerPosition,
      activePlayer,
      diceRoll,
      gameOver,
      activityLog,
    });
    addToActivityLog(`Game with ID ${gameId} saved successfully.`, 'info-message', 'system');
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};
