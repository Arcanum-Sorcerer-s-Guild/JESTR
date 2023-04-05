const knex = require("../dbConnections.js");

const getUserByUsername = async (username) => {
  return await knex("users").where("username", "ilike", username);
};

const createUser = async (username, hashedPassword, isAdmin) => {
  console.log("creating user:", { username, hashedPassword, isAdmin });
  return await knex("users")
    .insert([
      {
        username: username,
        password: hashedPassword,
        is_admin: isAdmin,
      },
    ])
    .returning("*");
};

module.exports = {
  getUserByUsername,
  createUser
};
