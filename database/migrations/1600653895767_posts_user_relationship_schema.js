'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsUserRelationshipSchema extends Schema {
  async up() {
    await this.create('posts', (table) => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    await this.drop('posts')
  }
}

module.exports = PostsUserRelationshipSchema
