import React from 'react';
import CoffeeFlake from './CoffeeFlake';
import { useSelector } from 'react-redux';

const Coffee = () => {
  const numFlakes = 20;
  const coffeeFlakes = new Array(numFlakes).fill('');

  return (
    <div className='Coffee' style={{zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {coffeeFlakes.map((el, i) => (
        <CoffeeFlake key={i} />
      ))}
    </div>
  );
};

export default Coffee;