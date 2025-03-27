const isAuthenticated = require('./isAuthenticated.js');
const {sessionNew} = require('./validators/session.schema.js')
const {appointmentsNew} = require('./validators/appointments.schema.js')

//console.log("typeof:",typeof(validator),Object.keys(validator));
module.exports= {isAuthenticated, validator:{sessionNew,appointmentsNew}};