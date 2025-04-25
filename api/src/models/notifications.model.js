const {  DataTypes } = require("sequelize");

const sequelize = require('../db/sequelize');

const Notifications = sequelize.define(
    "Notifications",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { tableName: "notifications", timestamps: false }
  );

module.exports= Notifications