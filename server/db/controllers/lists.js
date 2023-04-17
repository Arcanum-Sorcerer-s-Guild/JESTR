const knex = require('../dbConnections.js');

const getListItem = async (listName, itemId) => {
  if (itemId) {
    return await knex(listName).select('*').where('Id', '=', itemId);
  } else {
    return await knex(listName).select('*').where('Id', '>', 0);
  }
};

const createListItem = async (listName, payload) => {
  return await knex(listName).insert(payload).returning('*');
};

const updateListItem = async (listName, payload, itemId) => {
  if (itemId) {
    return await knex(listName)
      .where('Id', '=', itemId)
      .update(payload)
      .returning('*');
  } else {
    throw new Error('itemId is required');
  }
};

const deleteListItem = async (listName, itemId) => {
  return knex(listName).where('Id', '=', itemId).del();
};

module.exports = {
  getListItem,
  createListItem,
  deleteListItem,
  updateListItem,
};
