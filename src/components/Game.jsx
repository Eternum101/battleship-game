import React, { useRef } from 'react';
import { Header } from './Header';
import { PlayerFleet } from './PlayerFleet';
import { PlayerBoard } from './PlayerBoard';
import { ComputerBoard } from './ComputerBoard';
import { TurnIndicator } from './TurnIndicator';

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
  const mainRef = useRef(null);

  const scrollToMain = () => {
    mainRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main ref={mainRef}>
        <TurnIndicator gameState={gameState} />
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
              scrollToMain={scrollToMain}
            />
          </div>
          <div className="separator"></div>
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
      </main>
    </>
  );
};
