import GameBoard from "./GameBoard";
import '../styles/PlayerBoard.css'

function PlayerBoard({ board, handlePlayerCellClick }) {
    return (
    <div className="game-container">
      <h2 className="player-title">YOUR FLEET</h2>
      <div className="gameboard-container">
            <div class="row-header"></div>
            <div class="row-header">A</div>
            <div class="row-header">B</div>
            <div class="row-header">C</div>
            <div class="row-header">D</div>
            <div class="row-header">E</div>
            <div class="row-header">F</div>
            <div class="row-header">G</div>
            <div class="row-header">H</div>
            <div class="row-header">I</div>
            <div class="row-header">J</div>
                
            <div class="column-header">1</div>
            <div class="column-header">2</div>
            <div class="column-header">3</div>
            <div class="column-header">4</div>
            <div class="column-header">5</div>
            <div class="column-header">6</div>
            <div class="column-header">7</div>
            <div class="column-header">8</div>
            <div class="column-header">9</div>
            <div class="column-header">10</div>
          <GameBoard board={board} handleCellClick={handlePlayerCellClick} />
      </div>
    </div>
    );
}

export default PlayerBoard;
