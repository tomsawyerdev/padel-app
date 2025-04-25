const {  DataTypes } = require("sequelize");

const sequelize = require('../db/sequelize');

const Opponents = sequelize.define(
    "Opponents",
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
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { tableName: "opponents", timestamps: false }
  );

module.exports= Opponents