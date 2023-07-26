import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    coffee: 0,
    totalCPS: 0,
    totalCoffee: 0,
    diceRoll:0,
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
        price: 250,
        unlocked: false,
        cps: 5,
        qty: 0
      },
      {
        id: 'ten_cup_urn',
        price: 1250,
        unlocked: false,
        cps: 10,
        qty: 0
      },
      {
        id: 'espresso_machine',
        price: 5000,
        unlocked: false,
        cps: 20,
        qty: 0
      },
      {
        id: 'ten_gallon_urn',
        price: 25000,
        unlocked: false,
        cps: 50,
        qty: 0
      },
      {
        id: 'coffeeshop',
        price: 100000,
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
    ],
    backgrounds: [
        {
            id: '5230',
            unlocked: false,
            url: 'static/img/5230742.jpg',
            img:'static/img/store_level_1.svg',
            needTotalCoffee:10,
        },
        {
            id: '2208',
            unlocked: false,
            url: 'static/img/2208.i203.049.S.m004.c13.restaurant bar cafe furniture interior cartoon.jpg',
            img:'static/img/store_level_2.svg',
            needTotalCoffee:20,
        },
        {
            id: '2413',
            unlocked: false,
            url: 'static/img/2413.jpg',
            img:'static/img/store_level_3.svg',
            needTotalCoffee:30,
        },
        {
            id: '3398',
            unlocked: false,
            url: 'static/img/3398.jpg',
            img:'static/img/store_level_4.svg',
            needTotalCoffee:40,
        },
        {
            id: '2201',
            unlocked: false,
            url: 'static/img/2201.q702.010.S.m005.c12.coffee shop.jpg',
            img:'static/img/store_level_5.svg',
            needTotalCoffee:50,
        },
        {
            id: '2818',
            unlocked: false,
            url: 'static/img/2818892.jpg',
            img:'static/img/store_level_6.svg',
            needTotalCoffee:60,
        },
        {
            id: '5030',
            unlocked: false,
            url: 'static/img/5030563_2656251.jpg',
            img:'static/img/store_level_7.svg',
            needTotalCoffee:70,
        },
        {
            id: '1340',
            unlocked: false,
            url: 'static/img/AdobeStock_134055171.jpeg',
            img:'static/img/store_level_8.svg',
            needTotalCoffee:80,
        },
        {
            id: '2381',
            unlocked: false,
            url: 'static/img/AdobeStock_238191964.jpeg',
            img:'static/img/store_level_9.svg',
            needTotalCoffee:90,
        },
        {
            id: '2904',
            unlocked: false,
            url: 'static/img/AdobeStock_290470831.jpeg',
            img:'static/img/store_level_10.svg',
            needTotalCoffee:100,
        },

    ]
}

const coffeeSlice = createSlice({
    name:"coffee",
    initialState,
    reducers:{
        ClickCoffee:(state,action) =>{
            state.coffee = state.coffee + action.payload;
            state.totalCoffee = state.totalCoffee+action.payload;
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
                state.coffee = state.coffee + Math.floor(x.price/1.25 * 0.5);
                state.totalCPS = state.totalCPS-x.cps;
                x.price = Math.floor(x.price * 0.84);
            }
            return x;
        })
        return state;
       },
       Tick:(state) =>{
        state.coffee += state.totalCPS;
        state.totalCoffee += state.totalCPS;
        return state;
       },
       UnlockProducers: (state) => {
        let arr = state.producers;
        let result = arr.map(x =>{
            if(x.unlocked !== true) {
                if(state.coffee >= (x.price * 0.5)) {
                    x.unlocked =true;
                }
            }
            return x;
        })
        return state;

       },
       UnlockBackground: (state) => {
        let arr = state.backgrounds;
        let result = arr.map(x =>{
            if(x.unlocked !== true) {
                if(state.totalCoffee >= (x.needTotalCoffee)) {
                    x.unlocked =true;
                }
            }
            return x;
        })
        return state;

       }
       
    },
})
export const {ClickCoffee,AttempToBuyProducer,AttempToSellProducer,Tick,UnlockProducers,UnlockBackground} = coffeeSlice.actions;
export default coffeeSlice.reducer;