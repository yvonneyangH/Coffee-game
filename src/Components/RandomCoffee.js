import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveBonus } from '../store/bonusCoffee';
import { AddBonusCoffee } from '../store/coffee';

const RandomCoffee = () =>{
    const {coffee,bonusCoffee} = useSelector(state => state);
    const [bCoffee,setBCoffee] = useState(null);
    const [showBonusSignal,setShowBonusSignal] = useState(false);
    const dispatch = useDispatch();
    const bonusSignalRef = useRef(false);
    const [harvestCoffee,setHarvestCoffee] = useState(null);

    const handleActiveBonus = () => {
            dispatch(ActiveBonus());
            dispatch(AddBonusCoffee());
            setShowBonusSignal(true);
            bonusSignalRef.current = true;
    }
    useEffect(()=>{
        setHarvestCoffee(coffee);
    },[coffee])

    useEffect(() =>{
        const temp = bonusCoffee.goldern_cup.filter((g) =>{
            return g.active === true;
        })
        setBCoffee(temp[0]);
    },[bonusCoffee]);

    useEffect(() => {
       
        const cleanup = () => {
            bonusSignalRef.current = false;
        };

 
        if (showBonusSignal) {
            setTimeout(() => {
                setShowBonusSignal(false);
            }, 2000);
        }

        return cleanup;
    }, [showBonusSignal]);

    const positionXRef = useRef(bCoffee?.positionX);
    const positionYRef = useRef(bCoffee?.positionY);
    useEffect(()=>{
        positionXRef.current = bCoffee?.positionX
        positionYRef.current = bCoffee?.positionY
    }, [bCoffee?.positionX]);

    return (
        <>
        {bCoffee && harvestCoffee.coffee>0 ? (<div 
            style={{
                position:"absolute",
                top:`${bCoffee.positionX}vh`,
                left:`${bCoffee.positionY}vw`,
                animation: 'fadeInOutScaleVibrate 20s infinite',
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                zIndex:999}}
            >
            <img src={'static/img/latte.png'} style={{width:"8rem",height:"8rem", animation: 'glowingAnimation 10s'}} onClick={handleActiveBonus}></img>
            </div>
            ):(null)}
            {showBonusSignal && <span className="bonus-signal"  
            style={{
                position:"absolute",
                top:`${positionXRef.current}vh`,
                left:`${positionYRef.current}vw`,
                // animation: 'fadeInOutScaleVibrate 10s infinite',
                zIndex:999}}>COFFEE + 5% </span>}
        </>
    )
}
export default RandomCoffee;   