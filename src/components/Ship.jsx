import React from 'react';
import submarine from '../assets/submarine.png';
import destroyer from '../assets/destroyer.png';
import cruiser from '../assets/cruiser.png';
import battleship from '../assets/battleship.png';
import carrier from '../assets/carrier.png';

const shipImages = {
  submarine,
  destroyer,
  cruiser,
  battleship,
  carrier,
};

export const Ship = ({
  shipName,
  selectShip,
  availableShips,
  isCurrentlyPlacing,
}) => {
  let ship = availableShips.find((item) => item.name === shipName);
  const capitalizedShipName = shipName.charAt(0).toUpperCase() + shipName.slice(1);

  return (
    <div
      id={`${shipName}-replica`}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
      className={`replica ${isCurrentlyPlacing ? 'placing' : ''} ${ship.placed ? 'disabled' : ''}`}
    >
      <img
        src={shipImages[shipName]}
        alt={`${shipName}`}
        className="ship-image black-ship"
      />
      <div className="ship-name">{capitalizedShipName}</div>
    </div>
  );
};
