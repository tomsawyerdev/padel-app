const {Reservation} = require("../models");

const createReservation = async (data) => {
  const newElement = await Reservation.create(data) 
  return newElement;
};



module.exports = { createReservation };