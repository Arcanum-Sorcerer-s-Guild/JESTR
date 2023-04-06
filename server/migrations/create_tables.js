/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<voId> }
 */
exports.up = function (knex) {
  return knex.schema

    .createTable("users", (table) => {
      table.increments("Id").primary();
      table.string("Username").notNullable();
      table.string("Password").notNullable();
      table.string("Email").nullable();
      table.boolean("IsSiteAdmin").defaultTo(false);
    })

    .createTable("groups", (table) => {
      table.increments("Id").primary();
      table.string("Title").notNullable();
    })

    .createTable("user_groups", (table) => {
      table.increments("Id").primary();
      table.integer("users_Id").unsigned().notNullable();
      // table.foreign('entry_Id').references('Id').inTable('users');
      table.integer("groups_Id").unsigned().notNullable();
      // table.foreign('tag_Id').references('Id').inTable('users');
    })

    .createTable("assets", (table) => {
      table.increments("Id").primary();
      table.string("Title").notNullable();
      table.text("Serial").notNullable();
      table.text("System_x0020_Type").notNullable();
      table.text("Equipment").notNullable();
      table.text("Threat").notNullable();
      table.text("Status").notNullable();
      table.text("Status_x0020_change_x0020_date").notNullable();
      table.text("ETIC").notNullable();
      table.text("Remarks").notNullable();
      table.text("Information").notNullable();
      table.text("Equip_x002f_Threat").notNullable();
      table.text("Schedulable").notNullable();
      table.boolean("Availability").notNullable();
      table.boolean("Operational").notNullable();
      table.text("Range").notNullable(); // 2202 || 2205 || 2211
      table.text("Latitude").notNullable();
      table.text("Longitude").notNullable();
      table.text("Bullseye").notNullable();
      table.text("Elevation").notNullable();
      table.text("Accuracy").notNullable();
      table.text("Lon_x0020_DD").notNullable();
      table.text("Lat_x0020_DD").notNullable();
      table.text("Coord_x0020_Source").notNullable();
      table.text("Coord_x0020_Recorded_x0020_Date").notNullable();
      table.text("Notes").notNullable();
      table.text("Site_x0020_Location").notNullable();
      table
        .datetime("created", { useTz: false, precision: 3 })
        .defaultTo(knex.fn.now());
      table
        .datetime("modified", { useTz: false, precision: 3 })
        .defaultTo(knex.fn.now());
      table.integer("author_Id").unsigned().notNullable();
      table.foreign("author_Id").references("Id").inTable("users");
      table.integer("editor_Id").unsigned().notNullable();
      table.foreign("editor_Id").references("Id").inTable("users");
    })

    .createTable("schedule", (table) => {
      table.increments("Id").primary();
      table.text("Title").primary();
      table.text("location").primary();
      table.text("eventdate").primary();
      table.text("end_date").primary();
      table.text("description").primary();
      table.text("range").primary();
      table.text("contact_x0020_dsn").primary();
      table.text("contact_x0020_name").primary();
      table.text("threat_x0020_type").primary();
      table.text("threat_x002f_equipment").primary();
      table.text("notes").primary();
      table.text("status").primary();
      table.text("threat_x0020_window").primary();
      table.integer("author_Id").unsigned().notNullable();
      table.foreign("author_Id").references("Id").inTable("users");
      table.integer("editor_Id").unsigned().notNullable();
      table.foreign("editor_Id").references("Id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<voId> }
 */

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("schedule")
    .dropTableIfExists("assets")
    .dropTableIfExists("user_groups")
    .dropTableIfExists("groups")
    .dropTableIfExists("users")
};
