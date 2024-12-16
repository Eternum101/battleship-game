import React from 'react';
import battleshipImage from '../assets/battleship-gameover.png'; // Import the boat image
import cloudImage from '../assets/clouds.png';

export const GameOver = ({ winner, startAgain }) => {
  return (
    <div className="game-over-screen">
      <div className={`animation-wrapper ${winner !== 'player' ? 'losing-background' : ''}`}>
        <div className="water">
          <ul className="waves">
            <li className="wave-one" style={{ backgroundImage: "url('https://i.postimg.cc/7LtCC11Y/wave1.png')" }}></li>
            <li className="wave-two" style={{ backgroundImage: "url('https://i.postimg.cc/P5hv05rh/wave2.png')" }}></li>
            <li className="wave-three" style={{ backgroundImage: "url('https://i.postimg.cc/63Dyc91k/wave3.png')" }}></li>
            <li className="wave-four" style={{ backgroundImage: "url('https://i.postimg.cc/1tg8DgM0/wave4.png')" }}></li>
          </ul>
        </div>
        <img className={`boat ${winner !== 'player' ? 'boat-sunk' : ''}`} src={battleshipImage} alt="Battleship" /> {/* Use the imported image */}
        <img className="cloud" src={cloudImage} alt="Clouds"/>
        <img className="cloud2" src={cloudImage} alt="Clouds"/>
      </div>
      {winner === 'player' ? (
        <div className="winning-screen">
          <h1>Congratulations!</h1>
          <h2>You Win!</h2>
        </div>
      ) : (
        <div className="losing-screen">
          <h1>Game Over!</h1>
          <h2>You Lose!</h2>
        </div>
      )}
      <button onClick={startAgain}>Play Again</button>
    </div>
  );
};