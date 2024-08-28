import React, { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlayerBoard from './components/PlayerBoard';
import ComputerBoard from './components/ComputerBoard';
import { randomizeComputerShips } from './utils/computerShips';

function App() {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard] = useState(emptyBoard);
  const [computerBoard, setComputerBoard] = useState(emptyBoard);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = () => {
    setIsGameStarted(true);

    const computerShips = randomizeComputerShips(emptyBoard);
    setComputerBoard(computerShips);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid-container">
        <PlayerBoard 
          board={playerBoard} 
          boardType="player" 
          isGameStarted={isGameStarted}
          onGameStart={handleGameStart}
        />
        <div className="separator"></div>
        <ComputerBoard 
          board={computerBoard} 
          boardType="computer" 
          isGameStarted={isGameStarted}
        />
      </div>
    </DndProvider>
  );
}

export default App;
