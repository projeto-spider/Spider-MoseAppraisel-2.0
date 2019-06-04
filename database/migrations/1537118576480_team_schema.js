'use strict'

const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('userId').unsigned()
      table.foreign('userId').references('users.id')
      table.integer('unitId').unsigned()
      table.foreign('unitId').references('units.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema
