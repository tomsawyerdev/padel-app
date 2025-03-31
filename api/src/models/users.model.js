const {  DataTypes } = require("sequelize");

const db = require('../db/sequelize');

const User = db.define("users", {
    firstname: { type: DataTypes.STRING,   allowNull: false    },
    lastname: { type: DataTypes.STRING,   allowNull: false    },
    email: { type: DataTypes.STRING,   allowNull: false    },
    role_id: { type: DataTypes.STRING,   allowNull: false    },
    password: { type: DataTypes.STRING,   allowNull: false    }
    
 });


module.exports= User