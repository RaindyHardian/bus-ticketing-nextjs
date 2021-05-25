const Sequelize = require("sequelize");
const db = require("./config");

const seatModel = db.define('seat',{
    seat_id: { 
        type: Sequelize.INTEGER,

        primaryKey: true 
    },
    seat_code: {
        type:Sequelize.STRING
    },
    bus_id: {
        type:Sequelize.INTEGER
    },
    nr: {
        type:Sequelize.INTEGER
    },
    disable: {
        type:Sequelize.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = seatModel;