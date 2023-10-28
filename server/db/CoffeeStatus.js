const conn = require('./conn');
const { UUID, UUIDV4,INTEGER } = conn.Sequelize;

const CoffeeStatus = conn.define('coffeeStatus', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  coffee:{
    type:INTEGER,
    defaultValue:0,
  },
  totoalCPS:{
    type:INTEGER,
    defaultValue: 0,
  },
  coffeePClick:{
    type:INTEGER,
    defaultValue:0,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = CoffeeStatus;
