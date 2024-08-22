import React from "react"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlayerBoard from './components/PlayerBoard'
import ComputerBoard from './components/ComputerBoard'

function App() {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard, setPlayerBoard] = React.useState(emptyBoard);
  const [computerBoard, setComputerBoard] = React.useState(emptyBoard);

  return (
    <>
  <DndProvider backend={HTML5Backend}>
    <div className="grid-container">
      <PlayerBoard board={playerBoard} boardType="player"/>
      <div className="seperator"></div>
      <ComputerBoard board={computerBoard} boardType="computer"/>
    </div>
  </DndProvider>
    </>
  )
}

export default App
