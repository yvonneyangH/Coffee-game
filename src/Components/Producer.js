import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttempToBuyProducer, AttempToSellProducer } from '../store';
import ProducerInfo from './ProducerInfo';



const Producers = () => {
    const {coffee} = useSelector(state => state);
    const dispatch = useDispatch();
    // console.log(coffee);
    const [showProducers,setShowProducers] = useState([]);
    // console.log(coffee.producers);
    const handleBuy = (id,price) =>{
        console.log('buy id:',id,"price:",price)
        if (coffee.coffee>=price){
            dispatch(AttempToBuyProducer(id));
        }
       
    }
    const handleSell=(id,price)=>{
        // console.log('sell')
        dispatch(AttempToSellProducer(id));
    }
    useEffect(()=>{
        // console.log("hi");
        const result = coffee.producers.filter((p)=>{
            return p.unlocked===true;
        })
        // console.log("result:",result);
        setShowProducers(result);
    },[coffee]);



    // console.log("showProducers:",showProducers);
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
    const {coffee} = useSelector(state => state);
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
                <div className={`producer-title ${coffee.coffee >= producer.price || producer.qty>0?'' : 'producer-row-disabled'}`} style ={{fontSize:"1.2rem"}}>
                    {makeDisplayNameFromId(producer.id)}
                    <span style={{fontSize:'0.8rem'}}>{`       `+`        (coffee/sec: ${producer.cps})`}</span>
                </div>
                <button  className={coffee.coffee < producer.price?'buy-sell-button-disabled' : ''} type="button" id="buy_producer.id" onClick={()=>handleBuy(producer.id,producer.price)} disabled={coffee.coffee < producer.price}>Buy</button>
                <button className={producer.qty<=0?'buy-sell-button-disabled' : ''} type="button" id="sell_producer.id" onClick={()=>handleSell(producer.id,producer.price)} disabled={producer.qty<=0}>Sell</button>
            </div>
            <div className="producer-column">
                <div >Quantity: <span style={{fontSize:"2.5rem"}}>{producer.qty}</span></div>
                <div>{`Cost: ${producer.price} coffee`}</div>
            </div>

        </div>
    )

}

export default Producers;
