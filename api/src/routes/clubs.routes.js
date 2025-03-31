
const express = require('express');
var router = express.Router();

var {clubs:controller} = require('../controllers');

//var {validator} = require('../middlewares');

router.get('/', controller.list); 


// Get one
//router.get('/:id', controller.get);
// Create, 
//router.post('/',  validator.appointmentsNew, controller.create);

// Update 
// celebrate cambia string to number,
// sin el validator sequelize lo castea sin problema
//router.post('/:id', validator.appointmentsNew,controller.update);//

//Remove
//router.delete('/:id', controller.remove);


module.exports = router;  