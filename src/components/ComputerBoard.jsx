import React, { useState } from 'react';
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from './GameBoard';

export const ComputerBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
}) => {
  const [destroyedShips, setDestroyedShips] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );

  const fireTorpedo = (index) => {
    if (compLayout[index] === 'ship') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === 'empty') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === 'player-turn';
  const playerCanFire = playerTurn && !checkIfGameOver();

  let alreadyHit = (index) =>
    compLayout[index] === 'hit' ||
    compLayout[index] === 'miss' ||
    compLayout[index] === 'ship-sunk';

  const handleSquareClick = (index) => {
    if (playerCanFire && !alreadyHit(index)) {
      setSelectedSquare(index);
    }
  };

  const handleHitClick = (index) => {
    const newHits = fireTorpedo(index);
    const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
    setComputerShips(shipsWithSunkFlag);
    handleComputerTurn();
    setSelectedSquare(null);
  };

  let compSquares = compLayout.map((square, index) => {
    return (
      <div
        className={
          stateToClass[square] === 'hit' ||
          stateToClass[square] === 'miss' ||
          stateToClass[square] === 'ship-sunk'
            ? `comp-square ${stateToClass[square]}`
            : `comp-square ${selectedSquare === index ? 'selected' : ''}`
        }
        key={`comp-square-${index}`}
        id={`comp-square-${index}`}
        onClick={() => handleSquareClick(index)}
      >
        {selectedSquare === index && !alreadyHit(index) ? (
          <button className="btn-hit" onClick={() => handleHitClick(index)}>
            HIT
          </button>
        ) : ''}
      </div>
    );
  });

  const handleShipClick = (shipName) => {
    if (gameState !== 'placement') {
      setDestroyedShips((prevDestroyedShips) =>
        prevDestroyedShips.includes(shipName)
          ? prevDestroyedShips.filter((name) => name !== shipName)
          : [...prevDestroyedShips, shipName]
      );
    }
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div>
      <h2 className="computer-title">ENEMY FLEET</h2>
      <div className="board">
        <div className="board-row">
          <div className="corner"></div>
          {letters.map((letter, index) => (
            <div className="label" key={`letter-${index}`}>{letter}</div>
          ))}
        </div>
        {numbers.map((number, rowIndex) => (
          <div className="board-row" key={`row-${rowIndex}`}>
            <div className="label">{number}</div>
            {compSquares.slice(rowIndex * 10, (rowIndex + 1) * 10)}
          </div>
        ))}
      </div>
      <div className='enemy-fleet-container'>
        <div className='computer-fleet-title'>Destroyed Enemy Ships</div>
        <div className='destroyed-enemy-ships'>
          <div className="ships-left">
            <h2 
              className={`computer-ship ${destroyedShips.includes("Destroyer") ? "destroyed" : ""} ${gameState === 'placement' ? "disabled" : ""}`}
              onClick={() => handleShipClick("Destroyer")}
            >
              Destroyer (2)
            </h2>
            <h2 
              className={`computer-ship ${destroyedShips.includes("Submarine") ? "destroyed" : ""} ${gameState === 'placement' ? "disabled" : ""}`}
              onClick={() => handleShipClick("Submarine")}
            >
              Submarine (3)
            </h2>
            <h2 
              className={`computer-ship ${destroyedShips.includes("Cruiser") ? "destroyed" : ""} ${gameState === 'placement' ? "disabled" : ""}`}
              onClick={() => handleShipClick("Cruiser")}
            >
              Cruiser (3)
            </h2>
          </div>
          <div className="ships-right">
            <h2 
              className={`computer-ship ${destroyedShips.includes("Battleship") ? "destroyed" : ""} ${gameState === 'placement' ? "disabled" : ""}`}
              onClick={() => handleShipClick("Battleship")}
            >
              Battleship (4)
            </h2>
            <h2 
              className={`computer-ship ${destroyedShips.includes("Aircraft Carrier") ? "destroyed" : ""} ${gameState === 'placement' ? "disabled" : ""}`}
              onClick={() => handleShipClick("Aircraft Carrier")}
            >
              Aircraft Carrier (5)
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
