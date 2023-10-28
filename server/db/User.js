const conn = require('./conn');
const { STRING, UUID, UUIDV4, INTEGER } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email:{
    type:STRING,
    allowNull:false,
    validate:{
      notEmpty:true,
      isEmail:true,
    },
    unique:true,
  },
  coffeeStatus:{
    type:INTEGER,
    allowNull:true,
  },
});



User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.prototype.createCoffeeStatus = async function(){
  const status = await this.getStatus();
  return status;
}

User.prototype.getStatus = async function(){
  let status = await conn.models.coffeeStatus.findOne({
    where:{
      userId:this.id
    }
  });
  if(!status){
    status = await conn.models.coffeeStatus.create({
      userId:this.id
    })
  }
  status = await conn.models.coffeeStatus.findByPk(
    status.id
  )
  return status;
}

User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ username, password }){
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

module.exports = User;

