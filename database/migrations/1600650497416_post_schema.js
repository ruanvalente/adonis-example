'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
