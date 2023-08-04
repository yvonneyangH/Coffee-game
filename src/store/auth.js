import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={};

export const attempLogin =  createAsyncThunk("attempLogin",async(cred,{rejectWithValue}) => {
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

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(attempLogin.fulfilled,(state,action)=>{
      return action.payload;
    })
    builder.addCase(loginWithToken.fulfilled,(state,action)=>{
      return action.payload;
    })
  }
})
export default authSlice.reducer;