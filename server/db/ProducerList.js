const conn = require('./conn');
const { INTEGER, BOOLEAN, STRING, UUID, UUIDV4 } = conn.Sequelize;

const ProducerList = conn.define('producerList',{
    id:{
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    producerId:{
        type:STRING,
        allowNull:false,
    },
    price:{
        type:INTEGER,
        allowNull:false,
    },
    unlocked:{
        type:BOOLEAN,
        defaultValue:true,
    },
    cps:{
        type:INTEGER,
        allowNull:false,
    },
    qty:{
        type:INTEGER,
        allowNull:false,
    },
    imgUrl:{
        type:STRING,
        allowNull:false
    },

});

module.exports = ProducerList;