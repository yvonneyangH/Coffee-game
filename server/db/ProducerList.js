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
        allowNull:true,
    },
    price:{
        type:INTEGER,
        allowNull:true,
    },
    unlocked:{
        type:BOOLEAN,
        defaultValue:true,
    },
    cps:{
        type:INTEGER,
        allowNull:true,
    },
    qty:{
        type:INTEGER,
        allowNull:true,
    },
    imgUrl:{
        type:STRING,
        allowNull:true
    },

});

module.exports = ProducerList;