import React, { useState, useEffect } from 'react';
import { Ship } from './Ship';

export const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
  startAgain,
  rotateShip,
  randomizeShips,
}) => {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isRandomized, setIsRandomized] = useState(false);
  const [allShipsPlaced, setAllShipsPlaced] = useState(false);

  useEffect(() => {
    const allPlaced = availableShips.every((ship) => ship.placed);
    setAllShipsPlaced(allPlaced);
  }, [availableShips]);

  let shipsLeft = availableShips.map((ship) => ship.name);
  let ship = shipsLeft.map((shipName) => {
    const shipData = availableShips.find((ship) => ship.name === shipName);
    return (
      <Ship
        selectShip={shipData.placed ? null : selectShip}
        key={shipName}
        isCurrentlyPlacing={currentlyPlacing && currentlyPlacing.name === shipName}
        shipName={shipName}
        availableShips={availableShips}
        style={{ pointerEvents: shipData.placed ? 'none' : 'auto' }}
      />
    );
  });

  let fleet = (
    <div id="replica-fleet">
      {ship}
    </div>
  );

  let playButton = (
    <div id="play-ready">
      <button
        className="btn-start"
        onClick={() => {
          startTurn();
          setShowPlayButton(false);
          setGameStarted(true);
        }}
      >
        Start Game
        <span className="btn-start__inner">
          <span className="btn-start__blobs">
            <span className="btn-start__blob"></span>
            <span className="btn-start__blob"></span>
            <span className="btn-start__blob"></span>
            <span className="btn-start__blob"></span>
          </span>
        </span>
      </button>
    </div>
  );

  return (
    <div id="fleet-container">
    <div className="player-fleet-title"> {gameStarted ? 'Shipyard' : 'Place Fleet (Click to Place)'} </div>
      <div className='btn-fleet-container'>
        {!gameStarted && (
          <>
            <button
              className='btn-randomize'
              onClick={() => {
                randomizeShips();
                setIsRandomized(true);
              }}
            >
              Randomize
            </button>
            <button
              className='btn-rotate'
              onClick={rotateShip}
              disabled={isRandomized || allShipsPlaced || availableShips.length === 0} // Disable when all ships are placed
            >
              Rotate
            </button>
          </>
        )}
      </div>
      {fleet}
      {!gameStarted && allShipsPlaced && showPlayButton && playButton}
      <div className='info-container'>
        {!gameStarted && (
          <p
            className="btn-restart"
            onClick={() => {
              startAgain();
              setShowPlayButton(true);
              setGameStarted(false);
              setIsRandomized(false);
            }}
          >
            Restart
          </p>
        )}
      </div>
    </div>
  );
};
