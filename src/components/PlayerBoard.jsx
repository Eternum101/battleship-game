import React from 'react';
import {
  SQUARE_STATE,
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
} from './GameBoard';

export const PlayerBoard = ({
  currentlyPlacing,
  setCurrentlyPlacing,
  placeShip,
  placedShips,
  hitsByComputer,
}) => {

  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  layout = hitsByComputer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    layout
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    layout
  );

  const isPlacingOverBoard = currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip = isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = putEntityInLayout(layout, currentlyPlacing, SQUARE_STATE.ship);
    } else {
      let forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing),
      };
      layout = putEntityInLayout(layout, forbiddenShip, SQUARE_STATE.forbidden);
    }
  }

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  let squares = layout.map((square, index) => {
    return (
      <div
        onClick={() => {
          if (canPlaceCurrentShip) {
            placeShip(currentlyPlacing);
          }
        }}
        className={`square ${stateToClass[square]} ${
          square === SQUARE_STATE.miss ? 'player-miss' : ''
        }`}
        key={`square-${index}`}
        id={`square-${index}`}
        onMouseOver={() => {
          if (currentlyPlacing) {
            setCurrentlyPlacing({
              ...currentlyPlacing,
              position: indexToCoords(index),
            });
          }
        }}
      />
    );
  });

  return (
    <div>
      <h2 className="player-title">YOUR FLEET</h2>
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
            {squares.slice(rowIndex * 10, (rowIndex + 1) * 10)}
          </div>
        ))}
      </div>
    </div>
  );
};
