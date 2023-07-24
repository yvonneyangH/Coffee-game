import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    coffee: 0,
    totalCPS: 0,
    producers: [
      {
        id: 'chemex',
        price: 10,
        unlocked: false,
        cps: 1,
        qty: 0
      },
      {
        id: 'french_press',
        price: 50,
        unlocked: false,
        cps: 2,
        qty: 0
      },
      {
        id: 'mr._coffee',
        price: 100,
        unlocked: false,
        cps: 5,
        qty: 0
      },
      {
        id: 'ten_cup_urn',
        price: 500,
        unlocked: false,
        cps: 10,
        qty: 0
      },
      {
        id: 'espresso_machine',
        price: 1000,
        unlocked: false,
        cps: 20,
        qty: 0
      },
      {
        id: 'ten_gallon_urn',
        price: 5000,
        unlocked: false,
        cps: 50,
        qty: 0
      },
      {
        id: 'coffeeshop',
        price: 10000,
        unlocked: false,
        cps: 75,
        qty: 0
      },
      {
        id: 'coffee_factory',
        price: 50000,
        unlocked: false,
        cps: 100,
        qty: 0
      },
      {
        id: 'coffee_fountain',
        price: 100000,
        unlocked: false,
        cps: 200,
        qty: 0
      },
      {
        id: 'coffee_river',
        price: 500000,
        unlocked: false,
        cps: 500,
        qty: 0
      },
      {
        id: 'coffee_ocean',
        price: 1000000,
        unlocked: false,
        cps: 1000,
        qty: 0
      },
      {
        id: 'coffee_planet',
        price: 5000000,
        unlocked: false,
        cps: 2000,
        qty: 0
      }
    ]
}

const coffeeSlice = createSlice({
    name:"coffee",
    initialState,
    reducers:{
        ClickCoffee:(state,action) =>{
            state.coffee = state.coffee + action.payload;
            let arr = state.producers;
            let result = arr.map(x=> {
                if(x.unlocked !== true){
                    if(state.coffee >= (x.price * 0.5)){
                        x.unlocked = true;
                    }
                }
                return x;
            })
            return state;
        },
       AttempToBuyProducer:(state,action)=>{
        let arr = state.producers;
        let result = arr.map(x=>{
            if(x.id ===action.payload){
                x.qty++;
                state.coffee = state.coffee - x.price;
                state.totalCPS = state.totalCPS + x.cps;
                x.price = Math.floor(x.price * 1.25);
            }
            return x;
        })
        return state;
       },
       AttempToSellProducer:(state,action) => {
        let arr = state.producers;
        let result = arr.map(x => {
            if(x.id === action.payload) {
                x.qty--;
                state.coffee = state.coffee + Math.floor(x.price/1.25 * 0.6);
                state.totalCPS = state.totalCPS-x.cps;
                x.price = Math.floor(x.price * 0.84);
            }
            return x;
        })
        return state;
        
       }
    },
})
export const {ClickCoffee,AttempToBuyProducer,AttempToSellProducer} =coffeeSlice.actions;
export default coffeeSlice.reducer;