import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickCoffee,Tick,UnlockProducers } from '../store';
import Producers from './Producer';


const Game = ()=> {
    const {coffee} = useSelector(state => state);
    console.log("coffee:",coffee);
    const dispatch = useDispatch();
    const [showCoffeePerClick,setShowCoffeePerClick] = useState(false);
    
    const handleClickCoffee = () => {
        dispatch(ClickCoffee(1));
        setShowCoffeePerClick(true);
        setTimeout(() => {
            setShowCoffeePerClick(false);
          }, 300);
    }


    
    useEffect(() =>{
        dispatch(UnlockProducers());
    },[coffee]);

    useEffect(() => {
        // Function to call the Tick function and update coffee count
        const tickInterval = setInterval(() => {
          dispatch(Tick());
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(tickInterval);
        };
      }, [dispatch]);
    

  return (
    <div>
        <div className="column-container" id="test">
            <div className="column">
                <div className="container left">
                    <div className="counter-container">Coffee: <span id="coffee_counter">{coffee.coffee}</span></div>
                    <div className="cps-container"><span id="cps">{coffee.totalCPS}</span> coffee/second</div>
                    <div id="big_coffee" onClick={handleClickCoffee}>☕️
                    { showCoffeePerClick&&
                        <span className="click-animation" style={{color:"white"}}>+1</span>
                    }
                    </div>
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
