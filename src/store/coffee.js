import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    coffee: 0,
    totalCPS: 0,
    totalCoffee: 0,
    coffeePClick:1,
    producers: [
    {
        id: 'clicker',
        price: 5,
        unlocked: false,
        cps: 0,
        qty: 0,
        imgUrl:'static/img/pointer.png',
        },
      {
        id: 'chemex',
        price: 10,
        unlocked: false,
        cps: 1,
        qty: 0,
        imgUrl:'static/img/Chemex.png',
      },
      {
        id: 'french_press',
        price: 100,
        unlocked: false,
        cps: 2,
        qty: 0,
        imgUrl:'static/img/frenchPress.png',
      },
      {
        id: 'moka_pot',
        price: 500,
        unlocked:false,
        cps: 5,
        qty: 0,
        imgUrl:'static/img/mokaPot.png',
      },
      {
        id: 'fancy_capsule',
        price: 2000,
        unlocked: false,
        cps: 10,
        qty: 0,
        imgUrl:'static/img/coffeeCapsule.png',
      },
      {
        id: 'stream_milk',
        price: 8000,
        unlocked:false,
        cps: 20,
        qty: 0,
        imgUrl:'static/img/streamMilk.png',
      },
      {
        id: 'coffee_grider',
        price: 40000,
        unlocked: false,
        cps: 50,
        qty: 0,
        imgUrl:'static/img/coffeeGrinder01.png',
      },
      {
        id: 'speedy_blender',
        price: 120000,
        unlocked: false,
        cps: 75,
        qty: 0,
        imgUrl:'static/img/blender.png',
      },
      {
        id: 'expresso_machine',
        price: 200000,
        unlocked: false,
        cps: 100,
        qty: 0,
        imgUrl:'static/img/expressoMachine.png',
      },
      {
        id: 'roaster_machine',
        price: 600000,
        unlocked: false,
        cps: 200,
        qty: 0,
        imgUrl:'static/img/roasterMachine.png',
      },
      {
        id: 'hulling_machine',
        price: 2000000,
        unlocked: false,
        cps: 500,
        qty: 0,
        imgUrl:'static/img/hullingMachine.png',
      },
      {
        id: 'platinum_grinder',
        price: 5000000,
        unlocked: false,
        cps: 1000,
        qty: 0,
        imgUrl:'static/img/coffeeGrinder02.png',
      },
      {
        id: 'Magic_coffeeShop',
        price: 15000000,
        unlocked: false,
        cps: 2000,
        qty: 0,
        imgUrl:'static/img/coffeeShop.png',
      }
    ],
    backgrounds: [
        {
            id:'lv.1',
            name:' Popup Cafe',
            imgId: '5230',
            unlocked: false,
            url: 'static/img/5230742.jpg',
            img:'static/img/store_level_1.svg',
            needTotalCoffee:20,
            increase: {target:'clickCoffee',multiplier:2},
            isUpgrade: false,
            describe:"The mouse and cursors are twice as efficient."
        },
        {   id:'lv.2',
            name:'Town Cafe',
            imgId: '2208',
            unlocked: false,
            url: 'static/img/2208.i203.049.S.m004.c13.restaurant bar cafe furniture interior cartoon.jpg',
            img:'static/img/store_level_2.svg',
            needTotalCoffee:2000,
            increase: {target:'clickCoffee',multiplier:2},
            isUpgrade: false,
            describe:"The mouse and cursors are twice as efficient."
        },
        {
            id:'lv.3',
            name:' City Cafe',
            imgId: '2413',
            unlocked: false,
            url: 'static/img/2413.jpg',
            img:'static/img/store_level_3.svg',
            needTotalCoffee:8000,
            increase: {target:'clickCoffee',multiplier:10},
            isUpgrade: false,
            describe:"The mouse and cursors are 5 times as efficient."
        },
        {   id:'lv.4',
            name:' Vintage Cafe',
            imgId: '3398',
            unlocked: false,
            url: 'static/img/3398.jpg',
            img:'static/img/store_level_4.svg',
            needTotalCoffee:32000,
            increase: {target:'increaseCPS',multiplier:1.1},
            isUpgrade: false,
            describe:"Coffee per second + 10%."
        },
        {
            id:'lv.5',
            name:'Boutique Cafe',
            imgId: '2201',
            unlocked: false,
            url: 'static/img/2201.q702.010.S.m005.c12.coffee shop.jpg',
            img:'static/img/store_level_5.svg',
            needTotalCoffee:80000,
            increase: {target:'increaseCPS',multiplier:1.05},
            isUpgrade: false,
            describe:"Coffee per second + 5%."
        },
        {
            id:'lv.6',
            name:'Coffee Lounge',
            imgId: '2818',
            unlocked: false,
            url: 'static/img/2818892.jpg',
            img:'static/img/store_level_6.svg',
            needTotalCoffee:100000,
            increase: {target:'increaseCPS',multiplier:1.02},
            isUpgrade: false,
            describe:"Coffee per second + 2%."
        },
        {
            id:'lv.7',
            name:'Chain Cafe',
            imgId: '5030',
            unlocked: false,
            url: 'static/img/5030563_2656251.jpg',
            img:'static/img/store_level_7.svg',
            needTotalCoffee:500000,
            increase: {target:'increaseCPS',multiplier:1.01},
            isUpgrade: false,
            describe:"Coffee per second + 1%."

        },
        {
            id:'lv.8',
            name:'Urban Cafe Hub',
            imgId: '1340',
            unlocked: false,
            url: 'static/img/AdobeStock_134055171.jpeg',
            img:'static/img/store_level_8.svg',
            needTotalCoffee:2000000,
            increase: {target:'increaseProduction',multiplier:2},
            isUpgrade: false,
            describe:"Coffee producers production +10%."
        },
        {
            id:'lv.9',
            name:'International Cafe',
            imgId: '2381',
            unlocked: false,
            url: 'static/img/AdobeStock_238191964.jpeg',
            img:'static/img/store_level_9.svg',
            needTotalCoffee:500000,
            increase: {target:'increaseProduction',multiplier:1.05},
            isUpgrade: false,
            describe:"Coffee producers production +5%."
        },
        {
            id:'lv.10',
            name:'Coffee Empire',
            imgId: '2904',
            unlocked: false,
            url: 'static/img/AdobeStock_290470831.jpeg',
            img:'static/img/store_level_10.svg',
            needTotalCoffee:1000000,
            increase: {target:'increaseProduction',multiplier:1.01},
            isUpgrade: false,
            describe:"Coffee producers production +1%."
        },

    ]
}

const coffeeSlice = createSlice({
    name:"coffee",
    initialState,
    reducers:{
        ClickCoffee:(state,action) =>{
            console.log("click state",state)
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
                    if(x.id ==='clicker'){
                        state.coffeePClick++;
                        if(x.price<1000){
                            x.price = Math.floor(x.price * 5);
                        }else if(x.price<50000){
                            x.price = Math.floor(x.price * 1.75);
                        }else{
                            x.price = Math.floor(x.price * 1.25);
                        }
                        

                    }else{
                        x.price = Math.floor(x.price * 1.25);
                    }
                    
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
                    if(x.id ==='clicker'){
                        
                        state.coffee = state.coffee + Math.floor(x.price/1.75 * 0.5);
                        state.coffeePClick--;
                    }else{
                        state.totalCPS = state.totalCPS-x.cps;
                    }
                    // x.price = Math.floor(x.price * 0.84);
                }
                return x;
            })
            return state;
        },
        Tick:(state) =>{
            state.coffee += state.totalCPS/10;
            state.totalCoffee += state.totalCPS/10;
            state.coffeePClick
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
                    if(state.totalCoffee >= (x.needTotalCoffee*0.25)) {
                        x.unlocked =true;
                    }
                }
                return x;
            })
            return state;
        },
        AddBonusCoffee:(state) => {
            state.coffee = Math.ceil(state.coffee*1.05);
            return state;
        },
        UpdateInitialState:(state,action)=>{
            return action.payload;
        },
        UpgradeEfficient:(state,action) => { //action should be an id. need to upgrade the coffeeStore to pass the id .
            let arr = state.backgrounds;
            console.log('state.background:',state.backgrounds)
            let upgradeId = action.payload
            let selectedUpgrade = arr.find ((bg) => {
                return bg.id ===upgradeId;
            })
            console.log("filterUpgrade:",selectedUpgrade);
            if(selectedUpgrade){
                if(!selectedUpgrade.isUpgrade){//can upgrade or not, if upgrade===true, already upgraded.
                    selectedUpgrade.isUpgrade = true;
                    state.coffee -= selectedUpgrade.needTotalCoffee
                    console.log("selectedUpgrade:",selectedUpgrade)
                    if(selectedUpgrade.increase.target ==='clickCoffee'){
                        state.coffeePClick *= selectedUpgrade.increase.multiplier;
                    }else if(selectedUpgrade.increase.target ==='increaseCPS'){
                        state.totalCPS =Math.ceil(state.totalCPS*selectedUpgrade.increase.multiplier);
                    }else if(selectedUpgrade.increase.target ==='increaseProduction'){
                        let arr = state.producers;
                        let result = arr.map((p)=>{
                            console.log("p",p);
                            p.cps = Math.ceil(p.cps*selectedUpgrade.increase.multiplier);
                            return p;
                        })
                    }
                }
            }
            return state;
        },
    },
})
export const {ClickCoffee,AttempToBuyProducer,AttempToSellProducer,Tick,UnlockProducers,UnlockBackground,AddBonusCoffee,UpdateInitialState,UpgradeEfficient} = coffeeSlice.actions;
export default coffeeSlice.reducer;