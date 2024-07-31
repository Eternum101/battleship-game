import React from 'react';

function GameBoard({ board, handleCellClick }) {
  function Cell({ value, onClick }) {
    return (
      <button className='cell' onClick={onClick}>
        {value}
      </button>
    );
  }

  return (
    <div className='grid'>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            value={cell}
            onClick={() => handleCellClick(i, j)}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
