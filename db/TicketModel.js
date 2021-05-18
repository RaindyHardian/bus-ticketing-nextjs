const Sequelize = require("sequelize");
const db = require("./config");

const TicketModel = db.define(
  "ticket",
  {
    ticket_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    trip_id: {
      type: Sequelize.INTEGER,
    },
    seat_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = TicketModel;
