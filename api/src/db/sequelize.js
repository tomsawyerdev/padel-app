
const config = require('../config');
const Sequelize = require("sequelize");

/*
console.log("-----sequelize---------");
    console.log("user:",config.dbuser);
    console.log("host:",config.dbhost);
    console.log("port:",config.dbport);
    console.log("database:",config.dbdatabase);
    console.log("password:",config.dbpassword);
*/

//const sequelize = new Sequelize('postgres://adminuser:adminpassword@127.0.0.1:6432/padel')
const sequelize = new Sequelize(`postgres://${config.dbuser}:${config.dbpassword}@${config.dbhost}:${config.dbport}/${config.dbdatabase}`,
                                {define: { timestamps: false},logging: false}) ;
/*
const sequelize = new Sequelize({
          dialect:  'postgres',
          database: config.dbdatabase,
          user: config.dbuser,
          password: config.dbpassword,
          host: config.dbhost,
          port: config.dbport,
          ssl: true,
          clientMinMessages: 'notice',
        });
*/
module.exports = sequelize;