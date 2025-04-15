const isAuthenticated = require('./isAuthenticated.js');
const {sessionNew} = require('./validators/session.schema.js')
const {reservationNew} = require('./validators/reservation.schema.js')

//console.log("typeof:",typeof(validator),Object.keys(validator));
module.exports= {isAuthenticated, validator:{sessionNew,reservationNew}};