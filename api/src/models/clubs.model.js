const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const Clubs = db.define("clubs", {
    
    name: { type: DataTypes.STRING},
    address: { type: DataTypes.STRING},
    email: { type: DataTypes.STRING},
    phone: { type: DataTypes.STRING},
    user_id: { type: DataTypes.INTEGER}

 });


module.exports= Clubs