import React, { useState, useEffect } from 'react';

function GameBoard({ board, boardType, selectedShip }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
  }, [selectedShip]);

  const handleMouseEnter = (i, j) => {
    setHoveredCell({ row: i, col: j });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const isValidPlacement = (i, j) => {
    if (!selectedShip) return false;
    const { length, orientation } = selectedShip;
    if (orientation === 'horizontal') {
      return j + length <= board[0].length;
    } else {
      return i + length <= board.length;
    }
  };

  const getCellStyle = (i, j) => {
    if (hoveredCell && isValidPlacement(hoveredCell.row, hoveredCell.col)) {
      const { row, col } = hoveredCell;
      const { length, orientation } = selectedShip;
      if (orientation === 'horizontal' && i === row && j >= col && j < col + length) {
        return { backgroundColor: '#d6263e' };
      } else if (orientation === 'vertical' && j === col && i >= row && i < row + length) {
        return { backgroundColor: '#d6263e' };
      }
    }
    return {};
  };

  function Cell({ row, col, value, onClick }) {
    return (
      <button
        className={`cell ${boardType}-cell`}
        onClick={() => {
          onClick();
        }}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseLeave={handleMouseLeave}
        style={getCellStyle(row, col)}
      >
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
            row={i}
            col={j}
            value={cell}
            onMouseEnter={() => handleMouseEnter(i, j)}
            onMouseLeave={handleMouseLeave}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
