import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickCoffee } from '../store';
import Producers from './Producer';


const Game = ()=> {
    const {coffee} = useSelector(state => state);
    console.log("coffee:",coffee);
    const dispatch = useDispatch();
    

  return (
    <div>
        <div className="column-container" id="test">
            <div className="column">
                <div className="container left">
                    <div className="counter-container">Coffee: <span id="coffee_counter">{coffee.coffee}</span></div>
                    <div className="cps-container"><span id="cps">{coffee.totalCPS}</span> coffee/second</div>
                    <div id="big_coffee" onClick={()=>dispatch(ClickCoffee(1))}>☕️</div>
                    <div id = 'save_load'>
                    <button className ='store' id ='save'>SAVE</button>
                    <button className ='store' id ='load'>LOAD</button>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column-header">Coffee Producers</div>
                <div className="container right" id="producer_container">
                <Producers/>
                </div>   
            </div>
        </div>
    </div>
  );
};

export default Game;
