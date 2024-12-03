import React from 'react';

export const TurnIndicator = ({ gameState }) => {
  const getTurnText = () => {
    if (gameState === 'player-turn') {
      return "Player's Turn";
    } else if (gameState === 'computer-turn') {
      return "Computer's Turn";
    } else {
      return '';
    }
  };

  if (gameState === 'player-turn' || gameState === 'computer-turn') {
    return (
      <div className="turn-indicator">
        <h2>{getTurnText()}</h2>
      </div>
    );
  }

  return null;
};
