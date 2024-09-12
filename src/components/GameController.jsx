import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import _ from 'lodash';

function GameController({ board, boardType, selectedShip, onShipPlaced, randomShips = [], isGameStarted }) {
  const [placedShips, setPlacedShips] = useState([]);
  const [validCells, setValidCells] = useState([]);
  const [cellValues, setCellValues] = useState(board);
  const [selectedCell, setSelectedCell] = useState(null);

  const prevHoverCell = useRef(null);

  useEffect(() => {
    setCellValues(board);
  }, [board]);

  const isValidPlacement = useCallback((i, j) => {
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
        if (placedShips.some(ship => ship.row === i && ship.col === j + k) ||
            randomShips.some(ship => ship.row === i && ship.col === j + k) ||
            isAdjacent(i, j + k)) return false;
      }
    } else {
      if (i + length > board.length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i + k && ship.col === j) ||
            randomShips.some(ship => ship.row === i + k && ship.col === j) ||
            isAdjacent(i + k, j)) return false;
      }
    }
    return true;
  }, [placedShips, randomShips, selectedShip]);

  const placeShip = useCallback((i, j) => {
    if (!isValidPlacement(i, j)) return;

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
    setValidCells([]);
    onShipPlaced();
  }, [isValidPlacement, placedShips, selectedShip, onShipPlaced]);

  const handleHover = useCallback(
    _.throttle((i, j) => {
      if (prevHoverCell.current && prevHoverCell.current.row === i && prevHoverCell.current.col === j) {
        return;
      }

      prevHoverCell.current = { row: i, col: j };

      if (!selectedShip || !isValidPlacement(i, j)) return;

      const { length, orientation } = selectedShip;
      const newValidCells = [];

      if (orientation === 'horizontal') {
        for (let k = 0; k < length; k++) {
          newValidCells.push({ row: i, col: j + k });
        }
      } else {
        for (let k = 0; k < length; k++) {
          newValidCells.push({ row: i + k, col: j });
        }
      }

      setValidCells(newValidCells);
    }, 100),
    [selectedShip, isValidPlacement]
  );

  const getCellStyle = (i, j) => {
    if (cellValues[i][j] === '💥') {
      return { color: '#d6263e' , fontSize: '25px' };
    }
  
    if (cellValues[i][j] === '•') {
      return { color: 'gray', fontSize: '65px'};
    }
  
    if (placedShips.some(ship => ship.row === i && ship.col === j) ||
        randomShips.some(ship => ship.row === i && ship.col === j)) {
      return { backgroundColor: '#d6263e' };
    }
  
    if (validCells.some(cell => cell.row === i && cell.col === j)) {
      return { backgroundColor: '#d46776' };
    }
  };
  
  const handleCellClick = (i, j) => {
    if (!isGameStarted || boardType !== 'computer') return;

    if (cellValues[i][j] === '💥' || cellValues[i][j] === '•') {
      return;
    }

    if (selectedCell && selectedCell.row === i && selectedCell.col === j) {
      return; 
    }

    setSelectedCell({ row: i, col: j });
  };

  const handleComputerHitClick = () => {
    if (!selectedCell) return;
  
    const { row, col } = selectedCell;
    const newCellValues = [...cellValues];
  
    if (board[row][col] === "ship") {
      newCellValues[row][col] = '💥';
    } else {
      newCellValues[row][col] = '•';
    }
  
    setCellValues(newCellValues);
    setSelectedCell(null);
  };  

  function Cell({ row, col, value }) {
    const [, drop] = useDrop({
      accept: 'ship',
      drop: () => placeShip(row, col),
      hover: () => handleHover(row, col),
    });

    return (
      <button
        ref={drop}
        className={`cell ${boardType}-cell`}
        style={{ ...getCellStyle(row, col) }}
        onClick={() => handleCellClick(row, col)}
      >
        {selectedCell && selectedCell.row === row && selectedCell.col === col ? (
          <button className="btn-hit" onClick={() => handleComputerHitClick(row, col)}>HIT</button>
        ) : (
          value === '💥' || value === '•' ? value : ''
        )}
      </button>
    );
  }

  return (
    <div className='grid'>
      {cellValues.map((row, i) =>
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



export default GameController;
