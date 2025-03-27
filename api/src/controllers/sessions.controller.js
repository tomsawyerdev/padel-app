const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
var config = require('../config');

var {Users} = require('../models');

const generateToken = (payload) => {


    const signature = config.jwtSecret;
    const algorithm = config.jwtAlgorithm;
    const expiresIn = config.jwtExpiration;
    //console.log('generateToken argument:',user);
    //console.log('generateToken payload:',payload);
    return jwt.sign( payload, signature, {algorithm, expiresIn });
  }

const create = async (req, res)=>{ 
    //console.log("Session create:",req.body);    

    const { username, password } = req.body;
    

    //https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone

    var user =  await Users.findOne({ where: { mail: username } });//,{ raw: true}
    
    if(user==null){ 
      res.json({status:401, message: 'Autenticación fallida' });
      return;

    }

    //console.log("Session create:",user);  
    //console.log("argon2.verify:",argon2.verify(user.hash, password) ); 
    const validPassword = await argon2.verify(user.password, password) 
    if (validPassword  )
     {
      // Crear el token    

      const token = generateToken({userid:user.id, username: user.mail }); //,userid:user.id
      const username = user.mail;
      res.json({status:200, username, token });
    } 

    else
    {
       res.json({status:401, message: 'Autenticación fallida' });
    }
}

module.exports = { create }
