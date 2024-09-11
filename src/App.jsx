import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from "./components/GameBoard.jsx";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameBoard/>
    </DndProvider>
  );
}

export default App;
