import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    goldern_cup:[
        {
        id: 'goldencup',
        life: 101,
        active: false,
        luckNumber: [1],
        positionX:0,
        positionY:0,
        }
    ]
}
const bonusCoffeeSlice = createSlice({
    name:"bonusCoffee",
    initialState,
    reducers:{
        RollDice:(state) => {
            let dice = Math.floor(Math.random() * 100) + 1;
            // console.log("dice:",dice) //make this random number 1-100
            let x = Math.floor(Math.random()*71+15) ;
            let y = Math.floor(Math.random()*71+15) ;
            let arr = state.goldern_cup;
            let result = arr.map(b =>{
                if(b.active !== true){
                    if(b.luckNumber.includes(dice)){
                        b.active =true;
                        b.life = 101;
                        b.positionX=x;
                        b.positionY=y;
                    }
                }return b;
            })
            return state;
        },
        BonusKill:(state) =>{
            let arr = state.goldern_cup;
            let result = arr.map(b =>{
                if(b.active === true){
                    b.life--;
                    if(b.life<=0){
                        b.active = false;
                    }
                }
                return b;
            })
            return state;
        },
        ActiveBonus:(state) =>{
            let arr = state.goldern_cup;
            let result = arr.map(b=> {
                if(b.active === true) {
                    b.life =0;
                    b.active =false;
                }
                return b; 
            })
            return state;
        }
    }
})

export const {RollDice,BonusKill,ActiveBonus} = bonusCoffeeSlice.actions;
export default bonusCoffeeSlice.reducer;