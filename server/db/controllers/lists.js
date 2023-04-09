const knex = require("../dbConnections.js");

const getListItem = async (listName, id) => {
  if (id) {
    return await knex(listName).select("*").where("Id", "=", id)
  } else {
    return await knex(listName).select("*").where("Id", ">", 0);
  }
};

const createListItem = async (listName, payload) => {
  return await knex(listName).insert(payload, '*');
};

const updateListItem = async (listName, payload, itemId) => {
  if (itemId) {
    return await knex(listName).where('Id', '=', itemId).update(payload, '*');
  } else {
    throw new Error('itemId is required');
  }
};

const deleteListItem = async (listName, id) => {
  return knex(listName).where("Id", "=", id).del();
};

module.exports = {
  getListItem,
  postListItem,
  deleteListItem
};
