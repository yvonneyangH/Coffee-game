const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/signUp',async(req,res,next) => {
  try{
    const {username,password,email} = req.body;
    const user = await User.create({username,password,email});
    res.send(await User.authenticate({username,password}));
  }catch(ex){
    next(ex);
  }
})

app.put('/save',async(req,res,next) => {
  try{
    const curCoffee = req.body;
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.update({coffeeStatus:1}))
    
  }catch(ex){
    next(ex);
  }
})