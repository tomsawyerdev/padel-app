
const { celebrate, Joi, Segments } = require('celebrate');


//------------------------------------
const day =  Joi.string().max(10).required();
const schedule_id = Joi.number().required();
const user_id = Joi.number().required();
const court_id = Joi.number().required();
const club_id = Joi.number().required();

//------------------------------------

  // email never change only the name
 const appointmentsNew = celebrate({
  [Segments.BODY]: Joi.object().keys({

    day,   
    schedule_id,
    user_id, 
    court_id, 
    club_id 
  }),
 });


  module.exports = {  appointmentsNew  };