import React from 'react';

export const GameOver = ({ winner, startAgain }) => {
  return (
    <div className={`game-over-screen ${winner === 'player' ? 'winning-background' : 'losing-background'}`}>
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
