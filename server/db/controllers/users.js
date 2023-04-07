const knex = require("../dbConnections.js");

const getUserByLoginName = async (LoginName) => {
  return await knex("Users").where("LoginName", "ilike", LoginName);
};

const getUserByEmail = async (email) => {
  return await knex("Users").where("Email", "ilike", email);
};

const createUser = async (user) => {
  console.log("creating user:", user);
  return await knex("Users")
    .insert([
      user,
    ])
    .returning("*");
};

module.exports = {
  getUserByLoginName,
  getUserByEmail,
  createUser,
};
