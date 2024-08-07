import React from "react"
import PlayerBoard from './components/PlayerBoard'
import ComputerBoard from './components/ComputerBoard'

function App() {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard, setPlayerBoard] = React.useState(emptyBoard);
  const [computerBoard, setComputerBoard] = React.useState(emptyBoard);

  return (
    <>
    <div className="grid-container">
      <PlayerBoard board={playerBoard} boardType="player"/>
      <div className="seperator"></div>
      <ComputerBoard board={computerBoard} boardType="computer"/>
    </div>
    </>
  )
}

export default App
