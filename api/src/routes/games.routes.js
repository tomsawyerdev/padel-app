
const express = require('express');
var router = express.Router();

var {games:controller} = require('../controllers');

var {validator} = require('../middlewares');



router.get('/list', controller.list); 
router.post('/search', controller.search); 

router.post('/new', controller.new_opponent); 
router.post('/update',validator.gameUpdate, controller.update_opponent); 





module.exports = router;  