import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CoffeeStore = (props) =>{
    const {coffee} = useSelector(state => state); 
    const changeBackground=props.changeBackground;
    const [showBackgrounds,setShowBackgrounds]= useState([]);
    // console.log('coffee:',coffee);
    useEffect(()=>{
        if(coffee !== undefined){
            // console.log("coffee.background",coffee.background)
            const result = coffee.backgrounds.filter((b)=>{
                return b.unlocked===true;
            })
            // console.log("result:",result);
            setShowBackgrounds(result);
        }
        
    },[coffee]);
    return (
        <div className="button-group">
            {
                showBackgrounds.map((b,index)=>{
                    return(
                        <button key={index} onClick={()=> changeBackground(b.url)} >
                            <img src={b.img} alt={`Button`} style={{ width: '50px', height: '50px' }}/>
                        </button>
                    )
                })
            }
            
        </div>
      );
}

export default CoffeeStore;



