import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import _ from 'lodash';

function GameController({ playerBoard, computerBoard, boardType, selectedShip, onShipPlaced, randomShips = [], isGameStarted }) {
  const [placedShips, setPlacedShips] = useState([]);
  const [validCells, setValidCells] = useState([]);
  const [playerCellValues, setPlayerCellValues] = useState(playerBoard);
  const [computerCellValues, setComputerCellValues] = useState(computerBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);

  const prevHoverCell = useRef(null);

  useEffect(() => {
    if (playerBoard) setPlayerCellValues(playerBoard);
    if (computerBoard) setComputerCellValues(computerBoard);
  }, [playerBoard, computerBoard]);

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
      if (j + length > playerCellValues[0].length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i && ship.col === j + k) ||
            randomShips.some(ship => ship.row === i && ship.col === j + k) ||
            isAdjacent(i, j + k)) return false;
      }
    } else {
      if (i + length > playerCellValues.length) return false;
      for (let k = 0; k < length; k++) {
        if (placedShips.some(ship => ship.row === i + k && ship.col === j) ||
            randomShips.some(ship => ship.row === i + k && ship.col === j) ||
            isAdjacent(i + k, j)) return false;
      }
    }
    return true;
  }, [placedShips, randomShips, selectedShip, playerCellValues]);

  const placeShip = useCallback((i, j) => {
    if (!isValidPlacement(i, j)) return;

    console.log(`Placing ship at ${i},${j}`);

    const { length, orientation } = selectedShip;
    const newPlacedShips = [...placedShips];
    const newPlayerCellValues = [...playerCellValues];

    if (orientation === 'horizontal') {
      for (let k = 0; k < length; k++) {
        newPlacedShips.push({ row: i, col: j + k });
        newPlayerCellValues[i][j + k] = 'playerShip';
      }
    } else {
      for (let k = 0; k < length; k++) {
        newPlacedShips.push({ row: i + k, col: j });
        newPlayerCellValues[i + k][j] = 'playerShip';
      }
    }

    setPlacedShips(newPlacedShips);
    setPlayerCellValues(newPlayerCellValues);
    setValidCells([]);
    onShipPlaced();
  }, [isValidPlacement, placedShips, selectedShip, playerCellValues, onShipPlaced]);

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

  const getCellStyle = (i, j, cellValues) => {
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
    if (!isGameStarted || boardType !== 'computer' || !playerTurn) return; // Prevent player from clicking if it's not their turn
  
    if (computerCellValues[i][j] === '💥' || computerCellValues[i][j] === '•') {
      return;
    }
  
    if (selectedCell && selectedCell.row === i && selectedCell.col === j) {
      return;
    }
  
    setSelectedCell({ row: i, col: j });
    console.log(`Player clicked on computer cell ${i},${j}`);
  };  

  const handlePlayerTurn = () => {
    if (!selectedCell || !playerTurn) return;
  
    const { row, col } = selectedCell;
    const newComputerCellValues = [...computerCellValues];
  
    console.log(`Player attacks cell ${row},${col}`);
    
    if (computerBoard[row][col] === "ship") {
      newComputerCellValues[row][col] = '💥';
      console.log(`Hit on cell ${row},${col}`);
    } else {
      newComputerCellValues[row][col] = '•';
      console.log(`Miss on cell ${row},${col}`);
    }
  
    setComputerCellValues(newComputerCellValues);
    setSelectedCell(null);
    setPlayerTurn(false);
    
    setTimeout(() => {
      handleComputerTurn();
    }, 1000); 
  };  

  const handleComputerTurn = () => {
    console.log("Computer's turn starts");
  
    if (!playerCellValues || playerCellValues.length === 0) return; // Early return if undefined or empty
      
    const availableCells = [];
    for (let i = 0; i < playerCellValues.length; i++) {
      if (!playerCellValues[i]) continue;
      for (let j = 0; j < playerCellValues[i].length; j++) {
        if (playerCellValues[i][j] !== '💥' && playerCellValues[i][j] !== '•') {
          availableCells.push({ row: i, col: j });
        }
      }
    }
  
    if (availableCells.length === 0) return;
  
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const { row, col } = availableCells[randomIndex];
  
    console.log(`Computer selected cell ${row},${col}`);
    
    const newPlayerCellValues = playerCellValues.map(row => [...row]);
  
    if (playerCellValues[row][col] === "playerShip") {
      newPlayerCellValues[row][col] = '💥'; 
      console.log(`Computer hits player's ship at ${row},${col}`);
    } else {
      newPlayerCellValues[row][col] = '•'; 
      console.log(`Computer misses at ${row},${col}`);
    }
  
    setPlayerCellValues(newPlayerCellValues);
  
    setTimeout(() => {
      console.log("Switching back to player's turn");
      setPlayerTurn(true); 
    }, 500);
  };
  

  function Cell({ row, col, value, cellValues }) {
    const [, drop] = useDrop({
      accept: 'ship',
      drop: () => placeShip(row, col),
      hover: () => handleHover(row, col),
    });

    return (
      <button
        ref={drop}
        className={`cell ${boardType}-cell`}
        style={{ ...getCellStyle(row, col, cellValues) }}
        onClick={() => handleCellClick(row, col)}
      >
        {selectedCell && selectedCell.row === row && selectedCell.col === col ? (
          <button className="btn-hit" onClick={() => handlePlayerTurn(row, col)}>HIT</button>
        ) : (
          value === '💥' || value === '•' ? value : ''
        )}
      </button>
    );
  }

  return (
    <div className='grid'>
      {boardType === 'player' ? (
        playerCellValues.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              row={i}
              col={j}
              value={cell}
              cellValues={playerCellValues}
            />
          ))
        )
      ) : boardType === 'computer' ? (
        computerCellValues.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              row={i}
              col={j}
              value={cell}
              cellValues={computerCellValues}
            />
          ))
        )
      ) : null}
    </div>
  );  
}

export default GameController;
