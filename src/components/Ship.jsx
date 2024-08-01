import React from 'react';

function Ship({ length, orientation, onDragStart }) {
  const shipStyle = {
    display: 'inline-block',
    width: orientation === 'horizontal' ? `${length * 30}px` : '30px',
    height: orientation === 'vertical' ? `${length * 30}px` : '30px',
    backgroundColor: 'gray',
    margin: '5px',
    cursor: 'grab'
  };

  return (
    <div
      className="ship"
      style={shipStyle}
      draggable
      onDragStart={onDragStart}
    >
      {Array(length).join('')}
    </div>
  );
}

export default Ship;
