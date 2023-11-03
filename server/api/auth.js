const express = require('express');
const app = express.Router();
const { User, CoffeeStatus, ProducerList } = require('../db');

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
  console.log('authoriztion:', req.headers.authorization)
  try{
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      // If user is not found, return a 404 Not Found response
      res.status(404).json({ error: 'User not found' });
    } else {
      const curCoffee = req.query.curCoffee.coffee;
      const curTotalCPS = req.query.curCoffee.totalCPS; 
      const curTotalCoffee = req.query.curCoffee.totalCoffee; 
      const coffeeStatus = await CoffeeStatus.findOne({where:{userId:user.id}})
      const producerlist = await ProducerList.findOne({where:{userId:user.id}})
      if(!coffeeStatus){
        res.status(404).json({error:"coffee status not found"})
      }else{
        await coffeeStatus.update({coffee:curCoffee,totalCPS:curTotalCPS,totalCoffee:curTotalCoffee,})
        await producerlist.update({producerId:'lv1',})
      }
      res.send(await User.findByToken(req.headers.authorization));
    }
    
  }catch(ex){
    next(ex);
  }
})