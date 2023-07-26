import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bonusCoffee from '../store/bonusCoffee';

const RandomCoffee = () =>{
    const {coffee,bonusCoffee} = useSelector(state => state);
    console.log("bonusCoffee:",bonusCoffee);
    const [positionX,setPositionX] = useState(null);
    const [positionY,setPositionY] = useState(null);
    const [bCoffee,setBCoffee] = useState(null);
    useEffect(() =>{
        const temp = bonusCoffee.goldern_cup.filter((g) =>{
            return g.active === true;
        })
        setBCoffee(temp[0]);
        console.log("b");
    },[bonusCoffee])

    
    return (
        bCoffee && (<span 
            style={{
                position:"absolute",
                top:`${bCoffee.positionX}vh`,
                left:`${bCoffee.positionY}vw`,
                animation: 'fadeInOutScaleVibrate 10s infinite'}}
            >
            <img src={'static/img/latte.svg'} style={{width:"15rem",height:"15rem"}}></img>
            </span>
            )
    )
}
export default RandomCoffee;