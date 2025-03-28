
const express = require('express');
var router = express.Router();

var {reservations:controller} = require('../controllers');

//var {validator} = require('../middlewares');



router.get('/list', controller.list); 
router.get('/search', controller.search); 



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