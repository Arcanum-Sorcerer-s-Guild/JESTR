const knex = require("../dbConnections.js");

const getUserById = async (userId) => {
  return await knex("Users").where("Id", "=", userId);
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
  getUserById,
  getUserByEmail,
  createUser,
};
