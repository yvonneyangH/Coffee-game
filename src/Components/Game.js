import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClickCoffee, Tick, UnlockBackground, UnlockProducers, RollDice, BonusKill, UpdateInitialState } from '../store';
import Producers from './Producer';
import CoffeeStore from './CoffeeStore';
import RandomCoffee from './RandomCoffee';
import UpgradeInfo from './UpgradeInfo';
import Coffee from './Coffee';


const Game = ()=> {
    const {coffee,bonusCoffee} = useSelector(state => state);
    const user = useSelector((state) => state.auth)
    // console.log("coffee:",coffee);
    // console.log("bonusCoffee:",bonusCoffee);
    const dispatch = useDispatch();
    const [showCoffeePerClick,setShowCoffeePerClick] = useState(false);
    const [intervalActive,setIntervalActive] =useState(false);
    const [url,setUrl] = useState(null);

    const stopInterval = () => {
        setIntervalActive(false);
      };
    
      // Function to start the interval
      const startInterval = () => {
        setIntervalActive(true);
      };
    
    const handleClickCoffee = () => {
        dispatch(ClickCoffee(coffee.coffeePClick));
        setShowCoffeePerClick(true);
        setTimeout(() => {
            setShowCoffeePerClick(false);
          }, 500);
    }

    const changeBackground = (url) =>{
        setUrl(url);
        console.log('update url')
    }

    const saveLocal =(ev) => {
        if(user.username){
            console.log('hi, with user name');
            dispatch(attemptSave(coffee.coffee));
        }else{
            
            console.log("without user log in , print coffee:",coffee);
            window.localStorage.setItem("gameLog",JSON.stringify(coffee));
            console.log('set LocalStorage');
            let log =window.localStorage.getItem("gameLog");
            console.log("parse log:",JSON.parse(log));
        }


    }
    const loadLocal = () => {
        const saveGameLog = window.localStorage.getItem("gameLog");
        if(saveGameLog) {
            const parsedGameLog = JSON.parse(saveGameLog);
            dispatch(UpdateInitialState(parsedGameLog));
        }

    }
    
    useEffect(() =>{
        dispatch(UnlockProducers());
        dispatch(UnlockBackground());
    },[coffee]);

    useEffect(() => {
        // Function to call the Tick function and update coffee count
        const tickInterval = setInterval(() => {
          dispatch(Tick());
          dispatch(RollDice());
          dispatch(BonusKill());
        }, 100);
    
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
                url===null?{ backgroundColor:"#cea573" } 
                : {  backgroundImage: `url('${url}')`,backgroundSize: "cover", backgroundPosition: "center center" }
                }
        >
            
            <div className="column">
                <div className="container left">
                    
                    <div className="counter-container">Coffee: <span id="coffee_counter">{coffee.coffee.toFixed(2)}</span></div>
                    <div className="cps-container"><span id="cps">{coffee.totalCPS}</span> coffee/second</div>
                    <RandomCoffee/>
                    
                    <div id="big_coffee" onClick={handleClickCoffee}>☕️
                    { showCoffeePerClick&&
                        <span className="click-animation" style={{color:"white"}}>+{coffee.coffeePClick}</span>
                    }
                    </div>
                    <div id = 'save_load'>
                        <button className ='store' id ='save' onClick={saveLocal}>SAVE</button>
                        <button className ='store' id ='load' onClick={loadLocal}>LOAD</button>
                    </div>
                    
                </div>
                {
                    coffee.totalCPS>=1&&(
                        <Coffee />
                    )
                }
                
            </div>
           
            <div className="column">
                <div className="column-header">Upgrade Cafe</div>
                <div className="container right" id="store_container" style={{backgroundColor:"rgb(206 165 115 / 73%)"}}>
                    <CoffeeStore changeBackground={changeBackground} />
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
