import React from 'react';

function Ship({ length, orientation, onDragStart }) {
  const shipStyle = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    width: orientation === 'horizontal' ? `${length * 30}px` : '30px',
    height: orientation === 'vertical' ? `${length * 30}px` : '30px',
    backgroundColor: '#D3D3D3',
    margin: '5px',
    cursor: 'grab',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    alignItems: 'center',
    justifyContent: 'center'
  };

  function Circle() {
    const circleStyle = {
      width: '15px',
      height: '15px',
      backgroundColor: 'white',
      borderRadius: '50%',
      margin: '5px auto'
    };
  
    return <div style={circleStyle}></div>;
  }
  

  return (
    <div
      className="ship"
      style={shipStyle}
      draggable
      onDragStart={onDragStart}
    >
      {Array.from({ length }).map((_, index) => (
        <Circle key={index} />
      ))}
    </div>
  );
}

export default Ship;
