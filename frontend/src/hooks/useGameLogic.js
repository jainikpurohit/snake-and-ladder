import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { rollDice, movePlayer, moveComputer, addToActivityLog } from '../utils/GameLogic';
import { loadGame, saveGame } from '../services/GameService';

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [computerPosition, setComputerPosition] = useState(0);
  const [activePlayer, setActivePlayer] = useState('player');
  const [diceRoll, setDiceRoll] = useState(null);
  const [playerDiceRoll, setPlayerDiceRoll] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [gameId, setGameId] = useState('');

  const snakeMappings = useMemo(() => new Map([
    [16, 6],
    [47, 26],
    [49, 11],
    [56, 53],
    [62, 19],
    [64, 60],
    [87, 59],
    [93, 25],
    [95, 75],
    [98, 49],
  ]), []);

  const ladderMappings = useMemo(() => new Map([
    [4, 14],
    [9, 31],
    [21, 42],
    [28, 84],
    [36, 44],
    [51, 67],
    [71, 91],
    [82, 97],
  ]), []);

  const handleRollDice = useCallback(() => {
    const roll = rollDice(setDiceRoll, (msg, type, player) => addToActivityLog(activityLog, setActivityLog, msg, type, player), activePlayer, gameOver);
    if (roll) {
      if (activePlayer === 'player') {
        setPlayerDiceRoll(roll);
        movePlayer(roll, playerPosition, setPlayerPosition, snakeMappings, ladderMappings, setActivePlayer, (msg, type, player) => addToActivityLog(activityLog, setActivityLog, msg, type, player), setGameOver);
      } else {
        moveComputer(roll, computerPosition, setComputerPosition, snakeMappings, ladderMappings, setActivePlayer, (msg, type, player) => addToActivityLog(activityLog, setActivityLog, msg, type, player), setGameOver);
      }
    }
  }, [activePlayer, gameOver, playerPosition, computerPosition, snakeMappings, ladderMappings, activityLog]);

  const handleLoadGame = useCallback(() => {
    const gameName = prompt('Enter the existing game ID to load:');
    if (gameName !== null) { // Check if the prompt was not cancelled
      if (gameName.trim() !== '') {
        loadGame(gameName, setGameId, setPlayerPosition, setComputerPosition, setActivePlayer, setDiceRoll, setGameOver, setActivityLog, (msg, type, player) => addToActivityLog(activityLog, setActivityLog, msg, type, player));
      } else {
        alert('Game ID cannot be empty!');
      }
    }
  }, [activityLog]);

  const handleSaveGame = useCallback(() => {
    const gameName = prompt('Enter a name to save or overwrite the game:');
    if (gameName !== null) { // Check if the prompt was not cancelled
      if (gameName.trim() !== '') {
        saveGame(gameName, playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog, (msg, type, player) => addToActivityLog(activityLog, setActivityLog, msg, type, player));
      } else {
        alert('Game name cannot be empty!');
      }
    }
  }, [playerPosition, computerPosition, activePlayer, diceRoll, gameOver, activityLog]);

  const handleResetGame = useCallback(() => {
    setPlayerPosition(0);
    setComputerPosition(0);
    setActivePlayer('player');
    setDiceRoll(null);
    setPlayerDiceRoll(null); // Reset player's dice roll
    setGameOver(false);
    setActivityLog([]);
  }, []);

  const activityLogRef = useRef(activityLog);

  useEffect(() => {
    activityLogRef.current = activityLog;
  }, [activityLog]);

  useEffect(() => {
    if (activePlayer === 'computer' && !gameOver) {
      const roll = rollDice(setDiceRoll, (msg, type, player) => addToActivityLog(activityLogRef.current, setActivityLog, msg, type, player), activePlayer, gameOver);
      setTimeout(() => moveComputer(
        roll,
        computerPosition,
        setComputerPosition,
        snakeMappings,
        ladderMappings,
        setActivePlayer,
        (msg, type, player) => addToActivityLog(activityLogRef.current, setActivityLog, msg, type, player),
        setGameOver
      ), 1000);
    }
  }, [activePlayer, gameOver, computerPosition, snakeMappings, ladderMappings]);

  return {
    playerPosition,
    setPlayerPosition,
    computerPosition,
    setComputerPosition,
    activePlayer,
    setActivePlayer,
    diceRoll,
    setDiceRoll,
    playerDiceRoll,
    setPlayerDiceRoll,
    gameOver,
    setGameOver,
    activityLog,
    setActivityLog,
    gameId,
    setGameId,
    snakeMappings,
    ladderMappings,
    handleRollDice,
    handleLoadGame,
    handleSaveGame,
    handleResetGame
  };
};

export default useGameLogic;
