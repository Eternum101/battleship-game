import React, { useState } from 'react';
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard';
import { randomizeComputerShips } from '../utils/computerShips';

function GameBoard() {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard, setPlayerBoard] = useState(emptyBoard);
  const [computerBoard, setComputerBoard] = useState(emptyBoard);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);
    const computerShips = randomizeComputerShips(emptyBoard);
    setComputerBoard(computerShips);
  };

  return (
    <div className="grid-container">
      <PlayerBoard
        playerBoard={playerBoard}
        isGameStarted={isGameStarted}
        onGameStart={handleGameStart}
      />
      <div className="separator"></div>
      <ComputerBoard 
        computerBoard={computerBoard} 
        isGameStarted={isGameStarted}
      />
    </div>
  );
}

export default GameBoard;
