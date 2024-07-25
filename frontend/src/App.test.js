// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the useGameLogic hook
jest.mock('./hooks/useGameLogic', () => ({
  __esModule: true,
  default: () => ({
    playerPosition: 0,
    computerPosition: 0,
    activePlayer: 'player',
    playerDiceRoll: null,
    gameOver: false,
    activityLog: [],
    snakeMappings: new Map(),
    ladderMappings: new Map(),
    handleRollDice: jest.fn(),
    handleLoadGame: jest.fn(),
    handleSaveGame: jest.fn(),
    handleResetGame: jest.fn()
  })
}));

describe('App Component', () => {
  test('renders header with game title', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the World of Snakes and Ladders!/i)).toBeInTheDocument();
  });

  test('renders game rules correctly', () => {
    render(<App />);
    const rules = [
      'Every Player starts at 0.',
      'Roll the dice to move forward.',
      'The player who reaches exactly on 100 first wins.',
      'Land on a snake to slide down.',
      'Land on a ladder to climb up.'
    ];

    rules.forEach(rule => {
      expect(screen.getByText(rule)).toBeInTheDocument();
    });
  });

  test('renders Board component with initial positions', () => {
    render(<App />);
    // Assuming Board component renders without props errors
    const board = screen.getByRole('main'); // Adjust the query based on actual role or test strategy
    expect(board).toBeInTheDocument();
  });
});
