const conn = require('./conn');
const User = require('./User');

const Order = require('./Order');
const LineItem  = require('./LineItem');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);


const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123', email:'moemoe@hotmail.com'}),
    User.create({ username: 'lucy', password: '123', email:'lucylucy@hotmail.com'}),
    User.create({ username: 'larry', password: '123', email:'larrylarry@hotmail.com'}),
    User.create({ username: 'ethyl', password: '123', email:'ethylethyl@hotmail.com'}),
  ]);

};


module.exports = {
  syncAndSeed,
  User,
};
