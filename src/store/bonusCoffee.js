import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiost from 'axios';

const initialState={
    goldern_cup:[
        {
        id: 'goldencup',
        life: 10,
        active: false,
        luckNumber: [1],
        }
    ]
}
const bonusCoffeeSlice = createSlice({
    name:"bonusCoffee",
    initialState,
    reducers:{
        RollDice:(state) => {
            let dice = Math.floor(Math.random() * 2) + 1; //make this random number 1-100
            let arr = state.goldern_cup;
            let result = arr.map(x =>{
                if(x.active !== true){
                    if(x.luckNumber.includes(dice)){
                        x.active ===false;
                    }
                }return x;
            })
            return state;
        }
    }
})

export const {RollDice} = bonusCoffeeSlice.actions;
export default bonusCoffeeSlice.reducer;