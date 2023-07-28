import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttempToBuyProducer, AttempToSellProducer } from '../store';
import ProducerInfo from './ProducerInfo';



const Producers = () => {
    const {coffee} = useSelector(state => state);
    const dispatch = useDispatch();
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

    return (
        <>
        {
            showProducers.map((p,index)=>{
                return(
                    <Producer 
                        key={index} 
                        producer={p} 
                        handleBuy={handleBuy} 
                        handleSell={handleSell}
                    />
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

             <div className="producer-column" style={{justifyContent:"center",alignItems:"center",flexBasis:"33%"}}>
                <div 
                    className={`producer-title ${coffee.coffee >= producer.price || producer.qty>0?'' : 'producer-row-disabled'}`} 
                    style ={{fontSize:"1.2rem",textAlign:"center"}}
                >
                    {makeDisplayNameFromId(producer.id)}
                </div>
                <button  
                    className={coffee.coffee < producer.price?'buy-sell-button-disabled' : ''} 
                    type="button" 
                    id="buy_producer.id" 
                    onClick={()=>handleBuy(producer.id,producer.price)} 
                    disabled={coffee.coffee < producer.price}
                >
                    Buy
                </button>
                <button 
                    className={producer.qty<=0?'buy-sell-button-disabled' : ''} 
                    type="button" 
                    id="sell_producer.id" 
                    onClick={()=>handleSell(producer.id,producer.price)} 
                    disabled={producer.qty<=0}
                >
                    Sell
                </button>
            </div>

            <div 
                className="producer-column" 
                style={{justifyContent:"center",alignItems:"center",gap:"0.1rem"}}
            >
                <div><img src={producer.imgUrl} style={{width:"2.3rem"}}/></div>
                {
                    producer.cps * 1 === 0 ?
                    (<> <div style={{fontSize:'0.8rem'}}>per <span style={{fontWeight:"bold"}}>click</span>: </div>
                        <div> + 1</div>
                    </>
                    ):(
                        <>
                            <div style={{fontSize:'0.8rem'}}>per <span style={{fontWeight:"bold"}}>second</span> </div>
                            <div>{`+ ${producer.cps}`}</div>
                        </>
                    )
                }
            </div>
           
            <div className="producer-column">
                <div >Quantity:</div>
                <div style={{fontSize:"2.5rem"}}>{producer.qty}</div>
                <div>{`Cost:`}</div>
                <div>{`${producer.price}`}</div>
            </div>

        </div>
    )
}

export default Producers;
