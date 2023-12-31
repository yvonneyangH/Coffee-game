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
                cursor:"pointer",
                justifyContent:"center",
                zIndex:999}}
            >
            <img src={'static/img/latte.png'} style={{width:"5rem",height:"5rem", animation: 'glowingAnimation 10s'}} onClick={handleActiveBonus}></img>
            </div>
            ):(null)}
            {showBonusSignal && (
                <div className="bonus-signal"  
                    style={{
                        position:"absolute",
                        top:`${positionXRef.current-8}vh`,
                        left:`${positionYRef.current-4}vw`,
                        // animation: 'fadeInOutScaleVibrate 10s infinite',
                        fontSize:"20px",
                        zIndex:999,
                        display:'flex',
                        flexDirection: "column",
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <p>Lucky!</p>
                    <p>Coffee +5%</p>
                </div>
            )}
        </>
    )
}
export default RandomCoffee;   