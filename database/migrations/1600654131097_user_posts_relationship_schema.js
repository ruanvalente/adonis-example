'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPostsRelationshipSchema extends Schema {
  async up() {
    await this.create('users', (table) => {
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    await this.drop('users')
  }
}

module.exports = UserPostsRelationshipSchema
