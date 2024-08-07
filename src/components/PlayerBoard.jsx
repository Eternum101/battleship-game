import React from "react";
import GameBoard from "./GameBoard";
import Ship from './Ship';
import '../styles/PlayerBoard.css'

function PlayerBoard({ board, handlePlayerCellClick }) {
  const handleDragStart = (e, ship) => {
    e.dataTransfer.setData('ship', JSON.stringify(ship));
  };

  const ships = [
    { length: 5, orientation: 'horizontal' },
    { length: 4, orientation: 'horizontal' },
    { length: 3, orientation: 'horizontal' },
    { length: 3, orientation: 'horizontal' },
    { length: 2, orientation: 'horizontal' }
  ];

  return (
    <div className="game-container">
      <h2 className="player-title">YOUR FLEET</h2>
      <div className="gameboard-container">
            <div className="row-header"></div>
            <div className="row-header">A</div>
            <div className="row-header">B</div>
            <div className="row-header">C</div>
            <div className="row-header">D</div>
            <div className="row-header">E</div>
            <div className="row-header">F</div>
            <div className="row-header">G</div>
            <div className="row-header">H</div>
            <div className="row-header">I</div>
            <div className="row-header">J</div>
                
            <div className="column-header">1</div>
            <div className="column-header">2</div>
            <div className="column-header">3</div>
            <div className="column-header">4</div>
            <div className="column-header">5</div>
            <div className="column-header">6</div>
            <div className="column-header">7</div>
            <div className="column-header">8</div>
            <div className="column-header">9</div>
            <div className="column-header">10</div>
          <GameBoard board={board} handleCellClick={handlePlayerCellClick} boardType="player"/>
      </div>
      <div className="fleet-container">
        <h1>Place Fleet</h1>
        <div className="btn-fleet-container">
          <button className="btn-randomize">Randomize</button>
          <button className="btn-flip">Flip</button>
        </div>
        <span className="fleet-info">Drag n' Drop (Press 'R' to Rotate)</span>
        <div className="fleet-draggable">
          {ships.map((ship, index) => (
              <Ship
                key={index}
                length={ship.length}
                orientation={ship.orientation}
                onDragStart={(e) => handleDragStart(e, ship)}
              />
            ))}
        </div>
      </div>
    </div>
    );
}

export default PlayerBoard;
