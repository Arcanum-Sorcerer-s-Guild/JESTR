// npm install @faker-js/faker --save-dev

const {faker} = require('@faker-js/faker');

let num_users = 50;
let num_entries = 500;
let num_tags = 15;
let num_entry_tags = 1500;

let seedString = ''

function createRandomLog() {
  
  return {
    title: faker.hacker.verb() + ' ' + faker.hacker.noun(),
    description: faker.hacker.phrase(),
    created: faker.date.between('2021-01-01T00:00:00.000Z','2023-01-01T00:00:00.000Z'),
    updated: null,
    user_id: faker.datatype.number({min:1,max:num_users})
  }
}

function createRandomUser() {
  return {
    username : faker.internet.userName(),
  }
}

function createRandomTag() {
  return {
    name : faker.hacker.noun(),
  }
}

function generateEntriesSeed(numSeeds = num_entries) {
  const seed_entries = []
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push(createRandomLog())
  }
  return seed_entries;
}

function generateUsersSeed(numSeeds = num_users) {
  const seed_entries = [];
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push(createRandomUser())
  }
  return seed_entries;
} 

function generateTagsSeed(numSeeds = num_tags) {
  const seed_entries = []
  for (let i = 0; i < numSeeds; i++) {
    seed_entries.push(createRandomTag())
  }
  return seed_entries;
}

function generateEntryTagsSeed(numEntries = num_entries, numTags = num_tags,numSeeds = num_entry_tags) {
  randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const seed_entries = []
  for (let i=0; i < numSeeds; i++) {
    seed_entries.push(
      {
        entry_id: randomInRange(1,numEntries),
        tag_id: randomInRange(1,numTags)
      }
    )
  }
  let maxEntry = 1;
  let minEntry = 1;
  let maxTag = 1;
  let minTag = 1;
  seed_entries.forEach(pair => {
    if (pair.entry_id > maxEntry) {
      maxEntry = pair.entry_id
    } else if (pair.entry_id < minEntry) {
      minEntry = pair.entry_id
    }
    if (pair.tag_id > maxTag) {
      maxTag = pair.tag_id
    } else if (pair.tag_id < minTag) {
      minTag = pair.tag_id
    }
  })
  console.log('maxEntry', maxEntry);
  console.log('minEntry', minEntry);
  console.log('maxTag', maxTag);
  console.log('minTag', minTag);
  // console.log(seed_entries);
  return seed_entries;
}

  // function generateEntriesSQL(numInsert) {
  //   insertString = "INSERT INTO public.entries (title,description,created,user_id) VALUES (" 
  //   for (let i = 0; i < numInsert; i++) {
  //     let {dateTimeGroup,eventTitle,eventBody,user_id} = createRandomLog()
  //     insertString += `'${eventTitle}','${eventBody}','${dateTimeGroup.toISOString()}','${user_id}'`
  //     console.log(insertString)
  //   }
  //   return insertString += ');'
  // }
    
  // let numberSeeds = 1000
  // console.log(generateEntriesSeed(numberSeeds))
  // console.log(generateUsersSeed(numberSeeds))
  // console.log(generateTagsSeed(numberSeeds))

  // //generateEntryTagsSeed(numEntries,numTags,numSeedsGenerated)
  // console.log(generateEntryTagsSeed(10,10,100))

module.exports = {generateEntriesSeed, generateUsersSeed, generateTagsSeed, generateEntryTagsSeed}