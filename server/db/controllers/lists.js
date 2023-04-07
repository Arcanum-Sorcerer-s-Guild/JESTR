const knex = require("../dbConnections.js");

const getListItem = async (listName, id) => {
  if (id) {
    return await knex(listName).select("*").where("Id", "=", id)
  } else {
    return await knex(listName).select("*").where("Id", ">", 0);
  }
};

const postListItem = async (listName, payload, id) => {
  if (id) {
    return await knex(listName).where("Id", "=", id).update(payload, "*");
  } else {
    return await knex(listName).insert({...payload, AuthorId: 1,EditorId: 1 }, "*");
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
