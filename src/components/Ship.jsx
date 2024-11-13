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

  return (
    <div
      id={`${shipName}-replica`}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
      className={isCurrentlyPlacing ? 'replica placing' : 'replica'}
    >
      <img
        src={shipImages[shipName]}
        alt={`${shipName}`}
        className={`ship-image ${shipName === 'battleship' ? 'battleship-image' : ''}`}
      />
    </div>
  );
};
