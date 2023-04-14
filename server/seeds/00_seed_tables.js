const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile.js')['development']);

const globalNumUsers = 100;
const globalNumAssets = 60;
const globalNumReservations = 400;
const globalDateRangeStart = '2023-01-01';
const globalDateRangeEnd = '2023-05-01';

function randomIncRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min) + min);
}

const generateFakeDate = (
  startDate = globalDateRangeStart,
  endDate = globalDateRangeEnd
) => {
  return faker.date.between(`${startDate}T00:00:00Z`, `${endDate}T00:00:00Z`);
};

const generateUsers = (numUsers = globalNumUsers) => {

  defaultPassword = 'password';
  hashedDefaultPassword = bcrypt.hashSync(defaultPassword, 10);

  const hardcodedUsers = [
    {
      LoginName: 'i:0e.t|fedvis|joseph.w.hartsfield',
      Title: 'Hartsfield Joseph DOD - joseph.w.hartsfield',
      Email: 'Joseph.Hartsfield@us.af.mil',
      Password: '$2b$10$UsKeiH3WcXiiSExAkVRz8OemrorThLhg6tqLh98jKVmZUtWp5NpcW', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|jacob.s.steward',
      Title: 'Steward Jacob DOD - jacob.s.steward',
      Email: 'Jacob.Steward@us.af.mil',
      Password: '$2b$10$ueciUEIX/XVp/T9s/GR4jOygLJsclVsSTdCybQKgnSA7xkmTgOPoK', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|david.b.bonilla',
      Title: 'Bonilla David DOD - david.b.bonilla',
      Email: 'David.Bonilla@us.af.mil',
      Password: '$2b$10$bQdHtPZNYyu3tMhQKpPGu.pIGTpLI/ls4DBL54t9raxsHpcdzsyZG', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|jason.m.martin',
      Title: 'Martin Jason DOD - jason.m.martin',
      Email: 'Jason.Martin@us.af.mil',
      Password: '$2b$10$bPdTDVkvqG7MVEHuN9Mtz.3ogQYpS7VExp7WT1oJYWLNRdBOXjNtK', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|kyle.h.hackett',
      Title: 'Hackett Kyle DOD - kyle.h.hackett',
      Email: 'Kyle.Hackett@us.af.mil',
      Password: '$2b$10$MgXcQaRN7NR3/hJO4aRt1em6Yq1jyHtuPEJeYc7tKDr89apkw5N6y', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|brandon.r.roques',
      Title: 'Roques Brandon DOD - brandon.r.roques',
      Email: 'Brandon.Roques@us.af.mil',
      Password: '$2b$10$SmPj0Ry74xDBjSyv06x7R.3lc/adNdbKJiIethrqAh9t923tJKJSO', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|first.m.last',
      Title: 'Last First DOD - first.m.last',
      Email: 'First.Last@us.af.mil',
      Password: '$2b$10$mpB1umV1L4B6BExRvfGfG.sZsgM8Ac0I0PbaNGZnymd0410Nx8iC2', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
    {
      LoginName: 'i:0e.t|fedvis|test.m.user', // test user
      Title: 'User Test DOD - test.m.user',
      Email: 'Test.User@us.af.mil',
      Password: '$2b$10$fUG51mix9BfHaPdDspHPU.ZWaD8DQUelmyOd3KirWQksh3/z/TMJ6', // password is first name all lowercase
      IsApprover: false,
      IsSiteAdmin: false,
    },
    {
      LoginName: 'i:0e.t|fedvis|test.m.approver', // test approver
      Title: 'Approver Test DOD - test.m.approver',
      Email: 'Test.Approver@us.af.mil',
      Password: '$2b$10$fUG51mix9BfHaPdDspHPU.ZWaD8DQUelmyOd3KirWQksh3/z/TMJ6', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: false,
    },
    {
      LoginName: 'i:0e.t|fedvis|test.m.admin', // test site admin
      Title: 'Admin Test DOD - test.m.admin',
      Email: 'Admin.User@us.af.mil',
      Password: '$2b$10$fUG51mix9BfHaPdDspHPU.ZWaD8DQUelmyOd3KirWQksh3/z/TMJ6', // password is first name all lowercase
      IsApprover: true,
      IsSiteAdmin: true,
    },
  ]

  const names = new Set();

  while ((names.size + hardcodedUsers.length) < numUsers) {
    const fName = faker.name.firstName();
    const mName = faker.name.firstName();
    const lName = faker.name.lastName();
    names.add(`${fName}.${mName[0]}.${lName}`);
  }

  const users = [...hardcodedUsers];
  names.forEach((name) => {
    const [fName, mInit, lName] = name.split('.');
    users.push({
      LoginName: `i:0e.t|fedvis|${fName}.${mInit}.${lName}`.toLowerCase(), // i:0e.t|fedvis|joseph.w.hartsfield
      Title:
        `${lName} ${fName} DOD - ` + `${fName}.${mInit}.${lName}`.toLowerCase(), // "Hartsfield Joseph DOD - joseph.w.hartsfield"
      Email: `${fName}.${lName}@us.af.mil`, // first.last@us.af.mil
      Password: hashedDefaultPassword, // password
    });
  });

  return users;
};

const generateAssets = (numAssets = globalNumAssets) => {
  const assets = [];
  while (assets.length < numAssets) {
    assets.push({
      Serial: faker.random.alphaNumeric(8), // "vx1y2z34"
      Equipment: `SA-${randomIncRange(1, 300)}`, // "xxy-123"
      Threat: `XM-${randomIncRange(1, 300)}`, // ""
      ThreatType: ['Manned', 'Unmanned'][randomIncRange(0, 1)],
      SystemInformation: `${faker.hacker.noun()} issues`, // "some string"
      StatusDate: generateFakeDate('2023-03-01', '2023-3-20'),
      Status: ['RED', 'AMBER', 'GREEN', 'NA'][randomIncRange(0, 3)], // RED ||AMBER || GREEN || NA
      ETIC: generateFakeDate('2023-03-01', '2024-3-20'), // 2022-11-02T19:44:06Z
      Remarks: faker.hacker.phrase(), // "some string"
      Schedulable: randomIncRange(1, 100) < 2 ? false : true, // true/false
      Operational: randomIncRange(1, 100) < 2 ? false : true, // true/false
      Range: [2202, 2205, 2211][randomIncRange(0, 2)], // 2202 || 2205 || 2211 || ?other?
      SiteLocation: `${faker.music.genre()}-${randomIncRange(1, 10)}`, // "string ex Charlie Batt"
      Latitude: faker.address.latitude(66, 65, 6), // "N64 37.220"= '';
      Longitude: faker.address.longitude(-145, -148, 6), // "W146 39.160"= '';
      Elevation: randomIncRange(3500, 4500), // 2000
      Accuracy: `+/- ${randomIncRange(3, 8)}`, // UNK / +/- 2m
      CoordSource: ['GARMIN GPX 55I', 'Arcanum', 'Sorcery', 'Magic'][
        randomIncRange(0, 3)
      ], // "some text: GARMIN GPX 55I"
      CoordRecordedDate: generateFakeDate('2020-03-01', '2020-08-01'), // 2022-11-02T19:44:06Z
      created: generateFakeDate('2023-03-01', '2023-3-20'),
      modified: generateFakeDate('2023-08-01', '2023-10-01'),
      AuthorId: 1,
      EditorId: 1,
    });
  }
  return assets;
};

const generateReservations = (
  numReservations = globalNumReservations,
  assets,
  numUsers = globalNumUsers
) => {
  const squadronsInfo = [
    { squadron: '123 CYS', contactDSN: '123-234-3456' },
    { squadron: '234 ACMS', contactDSN: '234-345-4567' },
    { squadron: '345 RANS', contactDSN: '345-456-5678' },
  ];

  const reservations = [];
  while (reservations.length < numReservations) {
    const asset = assets[randomIncRange(0, assets.length - 1)];

    const { squadron, contactDSN } =
      squadronsInfo[randomIncRange(0, squadronsInfo.length - 1)];

    const startDate = new Date(
      generateFakeDate(globalDateRangeStart, globalDateRangeEnd)
    );

    // Offset endState from startDate by +2 hours
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    const status = randomIncRange(1, 100);

    reservations.push({
      Squadron: squadron, // "VMGR-152"
      ContactDSN: contactDSN, // "123-456-7890"
      Range: asset.Range, // 2202 || 2205 || 2211 || ?other? **Pulled
      SiteLocation: asset.SiteLocation, // Charlie batt  **Pulled
      Threat: asset.Threat, // SA-3 **Pulled
      Equipment: asset.Threat, // T-2 **Pulled
      ThreatType: asset.ThreatType, // Manned / unmanned/ etc  **Pulled
      EventDate: startDate, //  "2021-05-18T17:00:00Z"
      EndDate: endDate, // "2021-05-18T19:00:00Z"
      Notes: faker.hacker.phrase(), //"some info"
      Status: status <= 5 ? 'Pending' : status <= 20 ? 'Rejected' : 'Approved', // Pending || Rejected || Approved
      AuthorId: randomIncRange(1, numUsers), // foreign key to Users table
      EditorId: 1, // foreign key to Users table
    });
  }

  return reservations;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Insert users
  let usersSeed = generateUsers();
  await knex('Users').del();
  await knex('Users').insert(usersSeed);
  console.log(`Inserted ${usersSeed.length} users`);

  // Insert asset
  let assetsSeed = generateAssets();
  await knex('Assets').del();
  await knex('Assets').insert(assetsSeed);
  console.log(`Inserted ${assetsSeed.length} assets`);

  // Insert templates
  let reservationsSeed = generateReservations(
    globalNumReservations,
    assetsSeed,
    globalNumUsers
  );
  await knex('Reservations').del();
  await knex('Reservations').insert(reservationsSeed);
  console.log(`Inserted ${reservationsSeed.length} reservations`);
};
