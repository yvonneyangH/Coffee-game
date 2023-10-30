import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={};

export const attemptLogin =  createAsyncThunk("attempLogin",async(cred,{rejectWithValue}) => {
  try{
    let response = await axios.post('api/auth',cred);
    window.localStorage.setItem('token',response.date);
    response = await axios.get('api/auth',{
      headers:{
        authorization:response.data
      }
    })
    return response.data;
  }
  catch(ex){
    return rejectWithValue(ex.response.data)
  }
})

export const loginWithToken = createAsyncThunk("loginWithToken", async(_,{rejectWithValue})=>{
  const token = window.localStorage.getItem('token');
  if(token){
    response = await axios.get('api/auth',{
      headers:{
        authorization:token
      }
    })
    return response.data;
  }else {
    return  rejectWithValue();
  }
})

export const attemptSave = createAsyncThunk("attemptSave", async(curCoffee)=> {
  const token = window.localStorage.getItem('token');
  let response = await axios.post('api/auth/save',{
    headers:{
      authorization:token,
      curCoffee:curCoffee
    }
  });
  return response.data

})

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(attemptLogin.fulfilled,(state,action)=>{
      return action.payload;
    })
    builder.addCase(loginWithToken.fulfilled,(state,action)=>{
      return action.payload;
    })
  }
})
export default authSlice.reducer;