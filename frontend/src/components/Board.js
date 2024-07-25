import React from 'react';
import './css/Board.css';
import PropTypes from 'prop-types';

const Board = ({ snakeMappings, ladderMappings, playerPosition, computerPosition }) => {
  const generateBoard = () => {
    const size = 10;
    let board = [];
    let number = size * size; // Start with the highest number
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(number);
        number--;
      }
      if (i % 2 === 1) {
        row.reverse();
      }
      board.push(row);
    }
    return board;
  };

  return (
    <div className="board">
      <table>
        <tbody>
          {generateBoard().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const isSnake = snakeMappings.has(cell);
                const isLadder = ladderMappings.has(cell);
                const destination = isSnake ? snakeMappings.get(cell) : isLadder ? ladderMappings.get(cell) : null;
                const isWinningCell = cell === 100;

                return (
                  <td
                    key={cellIndex}
                    className={`cell ${cell === playerPosition ? 'player' : ''} ${cell === computerPosition ? 'computer' : ''} ${isSnake ? 'snake' : ''} ${isLadder ? 'ladder' : ''} ${isWinningCell ? 'winning-cell' : ''}`}
                  >
                    {cell}
                    {destination && (
                      <div className={`destination-box ${isSnake ? 'snake-box' : 'ladder-box'}`}>
                        {destination}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Board.propTypes = {
  snakeMappings: PropTypes.instanceOf(Map).isRequired,
  ladderMappings: PropTypes.instanceOf(Map).isRequired,
  playerPosition: PropTypes.number.isRequired,
  computerPosition: PropTypes.number.isRequired,
};

export default Board;
