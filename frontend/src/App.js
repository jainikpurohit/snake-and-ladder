import React from 'react';
import './App.css';
import Board from './components/Board';
import GameRules from './components/GameRules';
import RightPanel from './components/RightPanel';
import useGameLogic from './hooks/useGameLogic';

// Setup Game rules as an array of strings
const rules = [
  'Every Player starts at 0.',
  'Roll the dice to move forward.',
  'The player who reaches exactly on 100 first wins.',
  'Land on a snake to slide down.',
  'Land on a ladder to climb up.'
];

function App() {
  // Destructure hook return values
  const {
    playerPosition,
    computerPosition,
    activePlayer,
    playerDiceRoll,
    gameOver,
    activityLog,
    snakeMappings,
    ladderMappings,
    handleRollDice,
    handleLoadGame,
    handleSaveGame,
    handleResetGame
  } = useGameLogic();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the World of Snakes and Ladders!</h1>
      </header>
      <div className="App-container">
        {/* Display game rules and activity log */}
        <GameRules rules={rules} activityLog={activityLog} />

        {/* Main game board */}
        <main className="App-board">
          <Board
            snakeMappings={snakeMappings}
            ladderMappings={ladderMappings}
            playerPosition={playerPosition}
            computerPosition={computerPosition}
          />
        </main>

        {/* Right panel for game controls */}
        <RightPanel
          onRollDice={handleRollDice}
          playerDiceRoll={playerDiceRoll}
          disabled={gameOver || activePlayer === 'computer'}
          onLoadGame={handleLoadGame}
          onSaveGame={handleSaveGame}
          onResetGame={handleResetGame}
          aria-label="Right panel for game controls"
        />
      </div>
    </div>
  );
}

export default App;
