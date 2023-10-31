import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={};

export const attemptLogin =  createAsyncThunk("attempLogin",async(cred,{rejectWithValue}) => {
  try{
    let response = await axios.post('api/auth',cred);
    window.localStorage.setItem('token',response.data);
    const token = window.localStorage.getItem('token');
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

export const attemptSave = createAsyncThunk("attemptSave", async(curCoffee,{rejectWithValue})=> {
  const token = window.localStorage.getItem('token');
  if(token){
  console.log('attemp save');
  console.log('token',token);
    try {
      let response = await axios.put('api/auth/save', null, {
        headers: {
          authorization: token,
        },
        params:{
          curCoffee:curCoffee,
        }
      });
      return response.data;
    } catch (error) {
      // Handle the error properly
      return rejectWithValue(error.response.data);
    }
  }else{
    return  rejectWithValue();
  }
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
    builder.addCase(attemptSave.fulfilled,(state,action)=>{
      return action.payload;
    })
  }
})
export default authSlice.reducer;