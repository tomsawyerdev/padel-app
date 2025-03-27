//import jwt from 'express-jwt';
//const {jwt} =pkg;
//import config from '../config';

var { expressjwt: jwt } = require("express-jwt");
;
const config = require('../config');
const getTokenFromHeader = req => {
    
    return req.headers.session; 
};

//https://github.com/auth0/express-jwt#readme

//The decoded JWT payload is available on the request via the auth property.

const isAuthenticated = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  algorithms: [config.jwtAlgorithm], // JWT Algorithm 
  getToken: getTokenFromHeader, // How to extract the JWT from the request

});

//export isAuthenticated;
//export default isAuthenticated;
module.exports = isAuthenticated;
