import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';

function GameBoard({ board, boardType, selectedShip, onShipPlaced, randomShips = [] }) {
  const [placedShips, setPlacedShips] = useState([]);

  const handleMouseEnter = (i, j) => {
    setHoveredCell({ row: i, col: j });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const isValidPlacement = (i, j) => {
    if (!selectedShip) return false;
    const { length, orientation } = selectedShip;
  
    const isAdjacent = (row, col) => {
      return placedShips.some(ship => 
        Math.abs(ship.row - row) <= 1 && Math.abs(ship.col - col) <= 1
      ) || randomShips.some(ship => 
        Math.abs(ship.row - row) <= 1 && Math.abs(ship.col - col) <= 1
      );
    };
  
    if (orientation === 'horizontal') {
      if (j + length > board[0].length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i && ship.col === j + k) || randomShips.some(ship => ship.row === i && ship.col === j + k) || isAdjacent(i, j + k)) return false;
      }
    } else {
      if (i + length > board.length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i + k && ship.col === j) || randomShips.some(ship => ship.row === i + k && ship.col === j) || isAdjacent(i + k, j)) return false;
      }
    }
    return true;
  };

  const placeShip = useCallback((i, j) => {
    if (!isValidPlacement(i, j)) {
      console.log("Invalid placement at:", i, j);
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
    console.log("Placed ships:", newPlacedShips);
    onShipPlaced();
  }, [isValidPlacement, placedShips, selectedShip, onShipPlaced]);

  const getCellStyle = (i, j) => {
    if (placedShips.some(ship => ship.row === i && ship.col === j) || randomShips.some(ship => ship.row === i && ship.col === j)) {
      return { backgroundColor: '#d6263e' };
    }
  }; 

  function Cell({ row, col, value }) {
    const [{ isOver }, drop] = useDrop({
      accept: 'ship',
      drop: () => placeShip(row, col),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <button
        ref={drop}
        className={`cell ${boardType}-cell`}
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
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;
