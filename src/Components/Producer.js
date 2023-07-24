import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttempToBuyProducer, AttempToSellProducer } from '../store';


const Producers = () => {
    const {coffee} = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(coffee);
    const [showProducers,setShowProducers] = useState([]);
    console.log(coffee.producers);
    const handleBuy = (id,price) =>{
        console.log('buy id:',id,"price:",price)
        if (coffee.coffee>=price){
            dispatch(AttempToBuyProducer(id));
        }
        else{
            window.alert('Not enough coffee to buy this producer!');
        }
    }
    const handleSell=(id,price)=>{
        console.log('sell')
        dispatch(AttempToSellProducer(id));
    }
    useEffect(()=>{
        console.log("hi");
        const result = coffee.producers.filter((p)=>{
            return p.unlocked===true;
        })
        console.log("result:",result);
        setShowProducers(result);
    },[coffee]);

    console.log("showProducers:",showProducers);
    return (
        <>
        {
            showProducers.map((p,index)=>{
                return(
                    <Producer key={index} producer={p} handleBuy={handleBuy} handleSell={handleSell}/>
                )
            })
        }
        </>
    )

    
}
const Producer = (props)=>{
    const producer = props.producer;
    const handleBuy = props.handleBuy;
    const handleSell = props.handleSell;
    const makeDisplayNameFromId = (id)=> {
        const tempArr = id.split('_');
        const newTempArr = tempArr.map(x =>{
          return x[0].toUpperCase() + x.slice(1);
        })
        return newTempArr.join(' ');
      
      }

    return (
        <div className='producer'>
            <div className="producer-column">
                <div className="producer-title">{makeDisplayNameFromId(producer.id)}</div>
                <button type="button" id="buy_producer.id" onClick={()=>handleBuy(producer.id,producer.price)}>Buy</button>
                <button type="button" id="sell_producer.id"onClick={()=>handleSell(producer.id,producer.price)} disabled={producer.qty<=0}>Sell</button>
            </div>
            <div className="producer-column">
                <div>{`Quantity: ${producer.qty}`}</div>
                <div>{`Coffee/second: ${producer.cps}`}</div>
                <div>{`Cost: ${producer.price} coffee`}</div>
            </div>
        </div>
    )

}

export default Producers;
