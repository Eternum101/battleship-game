import React, { useState, useEffect } from 'react';

function GameBoard({ board, boardType, selectedShip, onShipPlaced }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [placedShips, setPlacedShips] = useState([]);

  useEffect(() => {
    console.log(`Selected ship: ${selectedShip ? `length=${selectedShip.length}, orientation=${selectedShip.orientation}` : 'none'}`);
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
      if (j + length > board[0].length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i && ship.col === j + k)) return false;
      }
    } else {
      if (i + length > board.length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i + k && ship.col === j)) return false;
      }
    }
    return true;
  };

  const placeShip = (i, j) => {
    console.log(`Attempting to place ship at row=${i}, col=${j}`);
    if (!isValidPlacement(i, j)) {
      console.log('Invalid placement');
      return;
    }

    const { length, orientation } = selectedShip;
    const newPlacedShips = [...placedShips];

    if (orientation === 'horizontal') {
      for (let k = 0; k < length; k++) {
        newPlacedShips.push({ row: i, col: j + k });
      }
    } else {
      for (let k = 0; k < length; k++) {
        newPlacedShips.push({ row: i + k, col: j });
      }
    }

    setPlacedShips(newPlacedShips);
    onShipPlaced();
    console.log('Ship placed successfully');
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

    if (placedShips.some(ship => ship.row === i && ship.col === j)) {
      return { backgroundColor: '#d6263e' };
    }

    return {};
  };

  function Cell({ row, col, value }) {
    return (
      <button
        className={`cell ${boardType}-cell`}
        onClick={() => placeShip(row, col)}
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
            onClick={() => placeShip(i, j)}
            onMouseEnter={() => handleMouseEnter(i, j)}
            onMouseLeave={handleMouseLeave}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
