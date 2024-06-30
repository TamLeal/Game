import React from 'react';

const Card = ({ className, onClick, children }) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
