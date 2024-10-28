import React from 'react';
import { PlayerFleet } from './PlayerFleet';
import { PlayerBoard } from './PlayerBoard';
import { ComputerBoard } from './ComputerBoard';

export const Game = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  randomizeShips,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  startAgain,
  setComputerShips,
}) => {
  return (
    <section id="game-screen">
      <div className="player-container">
        <PlayerBoard
          currentlyPlacing={currentlyPlacing}
          setCurrentlyPlacing={setCurrentlyPlacing}
          placeShip={placeShip}
          placedShips={placedShips}
          hitsByComputer={hitsByComputer}
        />
        <PlayerFleet
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startTurn={startTurn}
          startAgain={startAgain}
          rotateShip={rotateShip}
          randomizeShips={randomizeShips}
        />
      </div>
    <div className="computer-container">
      <ComputerBoard
        computerShips={computerShips}
        changeTurn={changeTurn}
        gameState={gameState}
        hitComputer={hitComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={setComputerShips}
      />
    </div>
    </section>
  );
};
