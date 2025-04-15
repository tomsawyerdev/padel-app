const provider = require("../providers/reservation.provider");

const createReservation = async (data) => {
  return await provider.createReservation(data);
};


module.exports = { createReservation };