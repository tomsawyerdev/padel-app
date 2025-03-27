
var config = {};


    /**
     * App port, parseInt(process.env.PORT, 10),
     */
     config.port= 3000,
  
    /**
     * Database
     */
    
    //console.log("config env:",process.env);

    //console.log("WARNING: config env: TODO BORRAR, setear env: production or dev");

    console.log("-----Environment---------");
    console.log(process.env.POSTGRES_USER);
    console.log(process.env.POSTGRES_HOST);
    console.log(process.env.POSTGRES_DB);
    console.log(process.env.POSTGRES_PASSWORD);
    console.log(process.env.POSTGRES_PORT);
     
    config.dbuser= process.env.POSTGRES_USER || 'adminuser';// TODO borrar
    config.dbhost= process.env.POSTGRES_HOST || '127.0.0.1';
    config.dbdatabase= process.env.POSTGRES_DB || 'padel';
    config.dbpassword= process.env.POSTGRES_PASSWORD || 'adminpassword'; 
    config.dbport=  process.env.POSTGRES_PORT || 6432;

    //console.log("config:",config);
    
    console.log("----Configuration---------");
    console.log(config.dbuser);
    console.log(config.dbhost);
    console.log(config.dbdatabase);
    console.log(config.dbpassword);
    console.log(config.dbport);
    

    
    /**
     * JWT
     */
     config.jwtSecret= "supersecret"; //process.env.JWT_SECRET,
     config.jwtAlgorithm= "HS256";//process.env.JWT_ALGO,
     config.jwtExpiration= "10h";//1h
     //config.userProperty = "token";



    module.exports = config;

