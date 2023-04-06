const { faker } = require("@faker-js/faker");
const knex = require("knex")(require("../knexfile.js")["development"]);

const numUsers = 100;
const numEntries = 1500;
const numTags = 25;
const numEntryTags = 4000;
const numTemplates = 20;

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

const generateEntriesSeed = (numSeeds = numEntries) => {
  const seed_entries = [];
  while (seed_entries.length < numSeeds) {
    const generatedTitle = generateFakeTitle();
    const generatedDescription = generateFakeParagraph();
    const generatedDate = generateFakeDate();
    const generatedUserId = generateUserId();

    seed_entries.push({
      title: generatedTitle,
      description: generatedDescription,
      created: generatedDate,
      updated: generatedDate,
      user_id: generatedUserId,
    });
  }
  seed_entries.sort((a, b) => a.created - b.created);
  return seed_entries;
}

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
}

const generateTagsSeed = (numSeeds = numTags) => {
  const names = [];
  while (names.length < numSeeds) {
    let potentialName = faker.hacker.noun();
    while (names.includes(potentialName)) {
      potentialName += ` ${faker.hacker.noun()}`;
    }
    names.push(potentialName);
  }
  let seed_entries = names.map((n) => ({ name: n }));
  return seed_entries;
}

const generateEntryTagsSeed = (
  countEntries = numEntries,
  countTags = numTags,
  numSeeds = numEntryTags
) => {
  const seed_entries = [];
  while (seed_entries.length < numSeeds) {
    seed_entries.push({
      entry_id: randomInRange(1, countEntries),
      tag_id: randomInRange(1, countTags),
    });
  }
  return seed_entries;
}

const generateTemplatesSeed = async (
  numSeeds = numTemplates,
  numTagsToAttach = 3,
) => {

  let tagOptions = await knex.select("name").from("tags");
  let tagSelections = [];
  while (tagSelections.length < numTagsToAttach) {
    tagSelections.push(
      tagOptions.splice(randomInRange(0, tagOptions.length), 1)[0]
    );
  }

  let templates = [];
  while (templates.length < numSeeds) {
    let generatedTitle = generateFakeTitle();
    templates.push({
      name: `${generatedTitle} - Template`,
      form_data: {
        title: generatedTitle,
        description: generateFakeParagraph(),
        tags: tagSelections,
      },
    });
  }

  return templates;
};

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
  let tagsSeed = await generateTagsSeed();
  await knex("tags").del();
  await knex("tags").insert(tagsSeed);
  console.log(`Inserted ${tagsSeed.length} tags`);

  // Insert entries
  let entriesSeed = await generateEntriesSeed();
  await knex("entries").del();
  await knex("entries").insert(entriesSeed);
  console.log(`Inserted ${entriesSeed.length} entries`);

  // Insert entry_tags
  let entryTagsSeed = await generateEntryTagsSeed();
  await knex("entry_tag").del();
  await knex("entry_tag").insert(entryTagsSeed);
  console.log(`Inserted ${entryTagsSeed.length} entry_tag relationships`);

  // Insert templates
  let templatesSeed = await generateTemplatesSeed();
  await knex("templates").del();
  await knex("templates").insert(templatesSeed);
  console.log(`Inserted ${templatesSeed.length} templates`);
};
