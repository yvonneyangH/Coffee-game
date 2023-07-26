import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    goldern_cup:[
        {
        id: 'goldencup',
        life: 11,
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
            let dice = Math.floor(Math.random() * 2) + 1; //make this random number 1-100
            let x = Math.floor(Math.random()*81+10) ;
            let y = Math.floor(Math.random()*81+10) ;
            let arr = state.goldern_cup;
            let result = arr.map(b =>{
                if(b.active !== true){
                    if(b.luckNumber.includes(dice)){
                        b.active =true;
                        b.life = 11;
                        b.positionX=x;
                        b.positionY=y;
                    }
                }return b;
            })
            return state;
        },
        BonusKill:(state) =>{
            let arr = state.goldern_cup;
            let result = arr.map(x =>{
                if(x.active === true){
                    x.life--;
                    if(x.life<=0){
                        x.active = false;
                    }
                }return x;
            })
            return state;
        }
    }
})

export const {RollDice,BonusKill} = bonusCoffeeSlice.actions;
export default bonusCoffeeSlice.reducer;