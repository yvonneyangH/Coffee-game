import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickCoffee,Tick,UnlockBackground,UnlockProducers } from '../store';
import Producers from './Producer';
import CoffeeStore from './CoffeeStore';


const Game = ()=> {
    const {coffee} = useSelector(state => state);
    console.log("coffee:",coffee);
    const dispatch = useDispatch();
    const [showCoffeePerClick,setShowCoffeePerClick] = useState(false);
    const [url,setUrl] = useState(null);
    
    const handleClickCoffee = () => {
        dispatch(ClickCoffee(1));
        setShowCoffeePerClick(true);
        setTimeout(() => {
            setShowCoffeePerClick(false);
          }, 300);
    }

    const changeBackground = (url) =>{
        setUrl(url);
        console.log('update url')
    }


    
    useEffect(() =>{
        dispatch(UnlockProducers());
        dispatch(UnlockBackground());
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
        <div 
            className="column-container" 
            id="test" 
            style={
                url===null?
                    { backgroundColor:"#cea573" } 
                : 
                    {  backgroundImage: `url('${url}')`,backgroundSize: "cover", backgroundPosition: "center center" }
                }
        >
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
                <div className="column-header">Coffee Store</div>
                <div className="container right" id="store_container" style={{backgroundColor:"rgb(206 165 115 / 73%)"}}>
                    <CoffeeStore changeBackground={changeBackground}/>
                </div>
                <div className="column-header">Coffee Producers</div>
                <div className="container right" id="producer_container" style={{backgroundColor:"rgb(206 165 115 / 73%)"}}>
                    <Producers/>
                </div>   
            </div>
        </div>
    </div>
  );
};

export default Game;
