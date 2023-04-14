/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<voId> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // /_api/web/siteusers
      // /_api/Web/GetUserById(566)
      .createTable('Users', (table) => {
        table.increments('Id').primary();
        table.string('LoginName').notNullable(); // "i:0e.t|fedvis|joseph.w.hartsfield"
        table.string('Title').notNullable(); // "Hartsfield Joseph DOD - joseph.w.hartsfield"
        table.string('Password').notNullable(); // hashed password
        table.string('Email').nullable(); // "first.last@us.af.mil"
        table.boolean('IsSiteAdmin').defaultTo(false); // Site Collection Admin Rights
        table.boolean('IsApprover').defaultTo(false); // Member of Approver Group
      })

      // /_api/web/lists/GetByTitle('Master%20threat%20list')/items
      .createTable('Assets', (table) => {
        table.increments('Id').primary();
        table.text('Serial').nullable(); // "x1y2z3"
        table.text('Equipment').nullable(); // "xxy-123"
        table.text('Threat').nullable(); // ""
        table.text('ThreatType').nullable(); // ""
        table.text('SystemInformation').nullable(); // "some string"
        table
          .datetime('StatusDate', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now());
        table.text('Status').nullable(); // RED ||AMBER || GREEN || NA
        table
          .datetime('ETIC', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now()); // 2022-11-02T19:44:06Z
        table.text('Remarks').nullable(); // "some string"
        table.boolean('Schedulable').nullable(); // true/false
        table.boolean('Operational').nullable(); // true/false
        table.text('Range').nullable(); // 2202 || 2205 || 2211 || ?other?
        table.text('SiteLocation').nullable(); // "string ex Charlie Batt"
        table.text('Latitude').nullable(); // "N64 37.220",
        table.text('Longitude').nullable(); // "W146 39.160",
        table.text('Elevation').nullable(); // 2000
        table.text('Accuracy').nullable(); // UNK / +/- 2m
        table.text('CoordSource').nullable(); // "some text: GARMIN GPX 55I"
        table
          .datetime('CoordRecordedDate', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now()); // 2022-11-02T19:44:06Z
        table
          .datetime('created', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now());
        table
          .datetime('modified', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now());
        table.integer('AuthorId').unsigned().notNullable();
        table.foreign('AuthorId').references('Id').inTable('Users');
        table.integer('EditorId').unsigned().notNullable();
        table.foreign('EditorId').references('Id').inTable('Users');
      })

      .createTable('Reservations', (table) => {
        table.increments('Id').primary();
        table.text('Squadron').nullable(); // "VMGR-152"
        table.text('ContactDSN').nullable(); // "123-456-7890"
        table.text('Range').nullable(); // 2202 || 2205 || 2211 || ?other?
        table.text('SiteLocation').nullable(); // Charlie batt
        table.text('Threat').nullable(); // SA-3
        table.text('Equipment').nullable(); // T-2
        table.text('ThreatType').nullable(); // Manned / unmanned/ etc
        table
          .datetime('EventDate', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now()); //"2021-05-18T21:00:00Z"
        table
          .datetime('EndDate', { useTz: false, precision: 0 })
          .defaultTo(knex.fn.now()); // "2021-05-18T19:00:00Z"
        table.text('Notes').nullable(); //"some info"
        table.text('Status').nullable().defaultTo('Pending'); // Pending || Rejected || Approved
        table.integer('AuthorId').unsigned().notNullable();
        table.foreign('AuthorId').references('Id').inTable('Users');
        table.integer('EditorId').unsigned().notNullable();
        table.foreign('EditorId').references('Id').inTable('Users');
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<voId> }
 */

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Reservations')
    .dropTableIfExists('Assets')
    .dropTableIfExists('Users');
};
