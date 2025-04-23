const { celebrate, Joi, Segments } = require('celebrate');

//------------------------------------

const reservation_id = Joi.number().required();
const opponent_id = Joi.number().required().allow(null);

//------------------------------------

 const gameUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({

    reservation_id,
    opponent_id,
  }),
 });


  module.exports = {  gameUpdate  };