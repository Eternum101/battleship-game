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
    const newShips = ships.map(ship => ({
      ...ship,
      orientation: ship.orientation === 'horizontal' ? 'vertical' : 'horizontal'
    }));
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
        <div class="row-header"></div>
            <div class="row-header">A</div>
            <div class="row-header">B</div>
            <div class="row-header">C</div>
            <div class="row-header">D</div>
            <div class="row-header">E</div>
            <div class="row-header">F</div>
            <div class="row-header">G</div>
            <div class="row-header">H</div>
            <div class="row-header">I</div>
            <div class="row-header">J</div>
                
            <div class="column-header">1</div>
            <div class="column-header">2</div>
            <div class="column-header">3</div>
            <div class="column-header">4</div>
            <div class="column-header">5</div>
            <div class="column-header">6</div>
            <div class="column-header">7</div>
            <div class="column-header">8</div>
            <div class="column-header">9</div>
            <div class="column-header">10</div>
          <GameBoard board={board} boardType="player" selectedShip={selectedShip !== null ? ships[selectedShip] : null} onShipPlaced={handleShipPlacement} randomShips={randomShips}/>
        </div>
        <div className="fleet-container">
          <h1>Place Fleet (Drag 'N' Drop)</h1>
          <div className="btn-fleet-container">
            <button className="btn-randomize" onClick={handleRandomize} disabled={isShipSelected}>Randomize</button>
            <button className="btn-rotate" onClick={handleRotate} disabled={allShipsPlaced}>Rotate</button>
          </div>
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