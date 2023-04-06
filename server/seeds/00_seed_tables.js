const { faker } = require("@faker-js/faker");
const knex = require("knex")(require("../knexfile.js")["development"]);

const numUsers = 100;

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const generateFakeTitle = () => {
  return faker.hacker.verb() + " " + faker.hacker.noun();
};

const generateFakeParagraph = (numSentences = randomInRange(1, 20)) => {
  const fakeParagraph = [];
  while (fakeParagraph.length < numSentences) {
    fakeParagraph.push(faker.hacker.phrase());
  }
  return fakeParagraph.join(" ");
};

const generateUserId = (highestUserId = numUsers) => {
  return randomInRange(1, highestUserId);
};

const generateFakeDate = () => {
  return faker.date.between(
    "2021-01-01T00:00:00.000Z",
    "2023-01-01T00:00:00.000Z"
  );
};

const generateUsersSeed = (numSeeds = numUsers) => {
  const names = [];
  while (names.length < numSeeds) {
    let potentialName = faker.internet.userName();
    while (names.includes(potentialName)) {
      potentialName = `${faker.hacker.noun()}_${potentialName}`;
    }
    names.push(potentialName);
  }
  let seed_entries = names.map((n) => ({ username: n }));
  return seed_entries;
};

const fetcher = (url) => {
  //This will only work if CAC ENABLED
  let tasks = new Request(
    // "https://intelshare.intelink.gov/sites/354RANS/JESTR/_api/web/currentuser?$expand=PrincipalType"
    url,

    {
      method: "GET",
      credentials: "same-origin", // or credentials: 'include'
      headers: new Headers({
        Accept: "application/json; odata=verbose",
      }),
    }
  );

  fetch(tasks)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // items.forEach((item) => {
      //     console.log(item.ID,item.Title);
      // });
    });
};

const generateGroups = () => {};

const generateUserGroups = () => {};

const generateAssets = () => {};

const generateSchedule = () => {};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Insert users
  let usersSeed = await generateUsersSeed();
  await knex("users").del();
  await knex("users").insert(usersSeed);
  console.log(`Inserted ${usersSeed.length} users`);

  // Insert tags
  let GroupsSeed = await generateGroups();
  await knex("tags").del();
  await knex("tags").insert(GroupsSeed);
  console.log(`Inserted ${GroupsSeed.length} tags`);

  // Insert entries
  let userGroupsSeed = await generateUserGroups();
  await knex("entries").del();
  await knex("entries").insert(userGroupsSeed);
  console.log(`Inserted ${userGroupsSeed.length} entries`);

  // Insert entry_tags
  let assetsSeed = await generateAssets();
  await knex("entry_tag").del();
  await knex("entry_tag").insert(assetsSeed);
  console.log(`Inserted ${assetsSeed.length} entry_tag relationships`);

  // Insert templates
  let scheduleSeed = await generateSchedule();
  await knex("templates").del();
  await knex("templates").insert(scheduleSeed);
  console.log(`Inserted ${scheduleSeed.length} templates`);
};
