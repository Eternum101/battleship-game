import GameBoard from "./GameBoard";
import '../styles/ComputerBoard.css'

function ComputerBoard({ board, handleComputerCellClick }) {
    return (
    <div className="game-container">
        <h2 className="computer-title">ENEMY FLEET</h2>
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
            <GameBoard board={board} handleCellClick={handleComputerCellClick} boardType="computer"/>
        </div>
        <div className="enemy-fleet-container">
            <h1>Destroyed Enemy Ships</h1>
            <div className="destroyed-enemy-ships">
            <div class="ships-left">
                <h2>Destroyer (2)</h2>
                <h2>Submarine (3)</h2>
                <h2>Cruiser (3)</h2>
            </div>
            <div class="ships-right">
                <h2>Battleship (4)</h2>
                <h2>Aircraft Carrier (5)</h2>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ComputerBoard;