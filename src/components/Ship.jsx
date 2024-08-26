import React from 'react';
import { useDrag } from 'react-dnd';

function Ship({ length, orientation, onClick, isSelected }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ship',
    item: { length, orientation },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const shipStyle = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    width: orientation === 'horizontal' ? `${length * 30}px` : '30px',
    height: orientation === 'vertical' ? `${length * 30}px` : '30px',
    backgroundColor: isSelected ? '#d6263e' : '#D3D3D3',
    margin: '5px',
    cursor: 'grab',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDragging ? 0.5 : 1,
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
      ref={drag}
      className="ship"
      style={shipStyle}
      onClick={() => {
        console.log("Ship clicked:", length, orientation);
        onClick();
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <Circle key={index} />
      ))}
    </div>
  );
}

export default Ship;
