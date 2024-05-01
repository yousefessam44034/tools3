import React from 'react';
import './BirdsAnimation.css'; // Import the CSS file for styling

const BirdsAnimation = () => {
  return (
    <div className="birds-container">
      <div className="bird bird1"></div>
      <div className="bird bird2"></div>
      <div className="bird bird3"></div>
      <div className="bird bird4"></div>
      <div className="bird bird5"></div>
      {/* Add more bird elements if needed */}
    </div>
  );
};

export default BirdsAnimation;
