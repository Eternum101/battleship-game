import React, { useState } from 'react';
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

  let shipsLeft = availableShips.map((ship) => ship.name);

  let ship = shipsLeft.map((shipName) => (
    <Ship
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={currentlyPlacing && currentlyPlacing.name === shipName}
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

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
      {!gameStarted && (
        <>
          <div className="player-fleet-title"> Place Fleet (Click to Place)</div>
          <div className='btn-fleet-container'>
            <button className='btn-randomize' onClick={randomizeShips}>Randomize</button>
            <button className='btn-rotate' onClick={rotateShip}>Rotate</button>
          </div>
          {availableShips.length > 0 ? fleet : (showPlayButton ? playButton : null)}
        </>
      )}
      <div className='info-container'>
        <p
          className="btn-restart"
          onClick={() => {
            startAgain();
            setShowPlayButton(true);
            setGameStarted(false);
          }}
        >
          Restart
        </p>
      </div>
    </div>
  );
};
