const knex = require('../dbConnections.js');

const getEarliestReservationDate = async () => {
  return await knex('Reservations').min('EventDate', {
    as: 'EarliestReservationDate',
  });
};

module.exports = {
  getEarliestReservationDate,
};
