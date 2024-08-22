import React, { useState } from "react";
import GameBoard from "./GameBoard";
import Ship from './Ship';
import '../styles/PlayerBoard.css';

function PlayerBoard({ board }) {
  const [selectedShip, setSelectedShip] = useState(null);
  const [ships, setShips] = useState([
    { length: 5, orientation: 'horizontal' },
    { length: 4, orientation: 'horizontal' },
    { length: 3, orientation: 'horizontal' },
    { length: 3, orientation: 'horizontal' },
    { length: 2, orientation: 'horizontal' }
  ]);

  const [randomShips, setRandomShips] = useState([]);
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [allShipsPlaced, setAllShipsPlaced] = useState(false);

  const handleShipClick = (index) => {
    if (selectedShip === index) {
      setSelectedShip(null);
      setIsShipSelected(false);
    } else {
      setSelectedShip(index);
      setIsShipSelected(true);
    }
  };

  const handleShipPlacement = () => {
    if (selectedShip !== null) {
      const newFleet = ships.filter((_, index) => index !== selectedShip);
      setShips(newFleet);
      setSelectedShip(null);
      setIsShipSelected(true);
      if (newFleet.length === 0) {
        setAllShipsPlaced(true);
      }
    }
  };

  const handleRotate = () => {
    const newShips = ships.map((ship, index) => {
      if (index === selectedShip) {
        return {
          ...ship,
          orientation: ship.orientation === 'horizontal' ? 'vertical' : 'horizontal'
        };
      }
      return ship;
    });
    setShips(newShips);
  };

  const handleRandomize = () => {
    const newRandomShips = [];
    const newShips = [
      { length: 5, orientation: 'horizontal' },
      { length: 4, orientation: 'horizontal' },
      { length: 3, orientation: 'horizontal' },
      { length: 3, orientation: 'horizontal' },
      { length: 2, orientation: 'horizontal' }
    ];

    newShips.map(ship => {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      let row, col;
  
      do {
        row = Math.floor(Math.random() * board.length);
        col = Math.floor(Math.random() * board[0].length);
      } while (!isValidRandomPlacement(row, col, ship.length, orientation, newRandomShips));
  
      if (orientation === 'horizontal') {
        for (let k = 0; k < ship.length; k++) {
          newRandomShips.push({ row, col: col + k });
        }
      } else {
        for (let k = 0; k < ship.length; k++) {
          newRandomShips.push({ row: row + k, col });
        }
      }
  
      return { ...ship, orientation };
    });
  
    setRandomShips(newRandomShips);
    setShips([]);
    setAllShipsPlaced(true);
  };

  const isValidRandomPlacement = (row, col, length, orientation, randomShips) => {
    const isAdjacent = (r, c) => {
      return randomShips.some(ship => 
        Math.abs(ship.row - r) <= 1 && Math.abs(ship.col - c) <= 1
      );
    };
  
    if (orientation === 'horizontal') {
      if (col + length > board[0].length) return false;
      for (let k = 0; k < length; k++) {
        if (randomShips.some(ship => ship.row === row && ship.col === col + k) || isAdjacent(row, col + k)) return false;
      }
    } else {
      if (row + length > board.length) return false;
      for (let k = 0; k < length; k++) {
        if (randomShips.some(ship => ship.row === row + k && ship.col === col) || isAdjacent(row + k, col)) return false;
      }
    }
    return true;
  };  

  return (
      <div className="game-container">
        <h2 className="player-title">YOUR FLEET</h2>
        <div className="gameboard-container">
          <GameBoard board={board} boardType="player" selectedShip={selectedShip !== null ? ships[selectedShip] : null} onShipPlaced={handleShipPlacement} randomShips={randomShips}/>
        </div>
        <div className="fleet-container">
          <h1>Place Fleet</h1>
          <div className="btn-fleet-container">
            <button className="btn-randomize" onClick={handleRandomize} disabled={isShipSelected}>Randomize</button>
            <button className="btn-rotate" onClick={handleRotate} disabled={allShipsPlaced}>Rotate</button>
          </div>
          <span className="fleet-info" style={{ display: allShipsPlaced ? "none" : "block" }}>Choose Ship to Place</span>
          <div className="fleet-draggable">
            {ships.map((ship, index) => (
              <Ship
                key={index}
                length={ship.length}
                orientation={ship.orientation}
                onClick={() => handleShipClick(index)}
                isSelected={selectedShip === index}
              />
            ))}
          </div>
        </div>
      </div>
  );
}

export default PlayerBoard;
