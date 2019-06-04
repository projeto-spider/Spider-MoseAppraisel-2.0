'use strict'

const Schema = use('Schema')

class UserProfileSchema extends Schema {
  up () {
    this.create('user_profiles', (table) => {
      table.increments()
      table.integer('userId').unsigned()
      table.foreign('userId').references('users.id')
      table.integer('profileId').unsigned()
      table.foreign('profileId').references('profiles.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_profiles')
  }
}

module.exports = UserProfileSchema
