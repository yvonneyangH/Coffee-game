import React, { useState, useEffect } from 'react';

const CoffeeFlake = () => {
  const [animationDelay, setAnimationDelay] = useState('0s');
  const [width, setWidth] = useState('20px');
  const [height, setHeight] = useState('20px');
  const generateRandomPosition = () => {
    // Get a random horizontal position for the CoffeeFlake
    const randomPosition = `${Math.random() * 100}%`;
    return randomPosition;
  };

  useEffect(() => {
    generateCoffeeFlake();
  }, []);

  const generateCoffeeFlake = () => {
    const newDelay = `${(Math.random() * 16).toFixed(2)}s`;
    const width = `${Math.floor(Math.random() * 17) + 16}px`;
    const height= width;
    setAnimationDelay(newDelay);
    setWidth(width);
    setHeight(height);
  };

  return (
    <p className='CoffeeFlake' style={{ animationDelay,color:"grey"}}>
      <img src={'static/img/coffee-bean.png'} className="white-content-image" style ={{width,height}}/>
    </p>
  );
};

export default CoffeeFlake;