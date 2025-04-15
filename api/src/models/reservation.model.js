const {  DataTypes } = require("sequelize");

const sequelize = require('../db/sequelize');

const Reservation = sequelize.define(
    "Reservation",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      court_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "reservations", timestamps: false }
  );

module.exports= Reservation