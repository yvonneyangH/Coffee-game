import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpgradeEfficient } from '../store';
import UpgradeInfo from './UpgradeInfo';

const CoffeeStore = (props) =>{
    const {coffee} = useSelector(state => state); 
    const changeBackground=props.changeBackground;
    const [showBackgrounds,setShowBackgrounds]= useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [selected, setSelected] = useState(false);
    const dispatch=useDispatch();
   
    const handleMouseEnter = (targetUpgrade) => {
        setIsHovering(true);
        setSelected(targetUpgrade);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    // console.log('coffee:',coffee);
    const upgradeStore = (store) => {
        if(coffee.coffee>=store.needTotalCoffee){
            changeBackground(store.url);
            dispatch(UpgradeEfficient(store.id));
        }
    }

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
        <>
            <div className="button-group">
                {
                    showBackgrounds.map((b,index)=>{
                        return(
                            <button 
                                key={index} 
                                className={coffee.coffee < b.needTotalCoffee && !b.isUpgrade? 'button-disabled' : ''}
                                onClick={()=>upgradeStore(b)}
                                onMouseEnter={()=>handleMouseEnter(b)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img src={b.img} alt={`Button`} style={{ width: '40px', height: '40px' }}/>
                            </button>
                        )
                    })
                }
                
            </div>
            <div className="info">
                {
                    isHovering &&(<UpgradeInfo selected={selected}/>)
                }
            </div>
        </>
      );
}

export default CoffeeStore;
