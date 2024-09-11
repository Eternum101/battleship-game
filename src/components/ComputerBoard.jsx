import React from "react";
import GameController from "./GameController";
import '../styles/ComputerBoard.css';

function ComputerBoard({ board, isGameStarted }) {
    return (
        <div className="game-container">
            <h2 className="computer-title">ENEMY FLEET</h2>
            <div className="gameboard-container">
                <div className="row-header"></div>
                <div className="row-header">A</div>
                <div className="row-header">B</div>
                <div className="row-header">C</div>
                <div className="row-header">D</div>
                <div className="row-header">E</div>
                <div className="row-header">F</div>
                <div className="row-header">G</div>
                <div className="row-header">H</div>
                <div className="row-header">I</div>
                <div className="row-header">J</div>
                    
                <div className="column-header">1</div>
                <div className="column-header">2</div>
                <div className="column-header">3</div>
                <div className="column-header">4</div>
                <div className="column-header">5</div>
                <div className="column-header">6</div>
                <div className="column-header">7</div>
                <div className="column-header">8</div>
                <div className="column-header">9</div>
                <div className="column-header">10</div>
                    
                <GameController board={board} boardType="computer" isGameStarted={isGameStarted}/>
            </div>
            <div className="enemy-fleet-container">
                <h1>Destroyed Enemy Ships</h1>
                <div className="destroyed-enemy-ships">
                    <div className="ships-left">
                        <h2>Destroyer (2)</h2>
                        <h2>Submarine (3)</h2>
                        <h2>Cruiser (3)</h2>
                    </div>
                    <div className="ships-right">
                        <h2>Battleship (4)</h2>
                        <h2>Aircraft Carrier (5)</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComputerBoard;
