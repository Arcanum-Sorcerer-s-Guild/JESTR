const knex = require("../dbConnections.js");

const getListItem = async () => {
  return await knex("assets")
    // .insert(
    //   {
    //     title: title,
    //     description: description,
    //     user_id: user_id,
    //   },
    //   "*"
    // )
};

const pushListItem = async () => {
    // return await knex("assets")
    // .insert(
    //   {
    //     title: title,
    //     description: description,
    //     user_id: user_id,
    //   },
    //   "*"
    // )
};
const deleteListItem = async () => {
    // return await knex("assets")
    // .insert(
    //   {
    //     title: title,
    //     description: description,
    //     user_id: user_id,
    //   },
    //   "*"
    // )
};

module.exports = {
  getListItem,
  pushListItem,
  deleteListItem
};
