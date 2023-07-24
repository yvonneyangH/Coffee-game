import React from 'react';
import { useSelector } from 'react-redux';


const Game = ()=> {
    const {coffee} = useSelector(state => state);
    console.log("coffee:",coffee);
    

  return (
    <div>
        <div className="column-container" id="test">
            <div className="column">
                <div className="container left">
                    <div className="counter-container">Coffee: <span id="coffee_counter">{coffee.coffee}</span></div>
                    <div className="cps-container"><span id="cps">{coffee.totalCPS}</span> coffee/second</div>
                    <div id="big_coffee">☕️</div>
                    <div id = 'save_load'>
                    <button className ='store' id ='save'>SAVE</button>
                    <button className ='store' id ='load'>LOAD</button>
                    </div>
                </div>
            </div>
            <div className="column">
            <div className="column-header">Coffee Producers</div>
            <div className="container right" id="producer_container"></div>
            </div>
        </div>
    </div>
  );
};

export default Game;
