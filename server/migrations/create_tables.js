/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').nullable();
      table.boolean('is_admin').defaultTo(false);
    })
    .createTable('entries', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.datetime('created', { useTz: false, precision: 3 }).defaultTo(knex.fn.now());
      table.datetime('updated', { useTz: false, precision: 3 }).defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
    })
    .createTable('tags', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('entry_tag', (table) => {
      table.increments('id').primary();
      table.integer('entry_id').unsigned().notNullable();
      // table.foreign('entry_id').references('id').inTable('users');
      table.integer('tag_id').unsigned().notNullable();
      // table.foreign('tag_id').references('id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('entry_tag')
    .dropTableIfExists('tags')
    .dropTableIfExists('entries')
    .dropTableIfExists('users');
};
