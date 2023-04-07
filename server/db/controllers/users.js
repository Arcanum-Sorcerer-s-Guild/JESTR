const knex = require("../dbConnections.js");

const getUserByLoginName = async (LoginName) => {
  return await knex("Users").where("LoginName", "ilike", LoginName);
};

const createUser = async (LoginName, hashedPassword, IsOwner) => {
  console.log("creating user:", { LoginName, hashedPassword, IsOwner });
  return await knex("Users")
    .insert([
      {
        LoginName: LoginName,
        Password: hashedPassword,
        IsOwner: IsOwner,
      },
    ])
    .returning("*");
};

module.exports = {
  getUserByLoginName,
  createUser
};
