'use strict'

const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description', 500)
      table.string('phone').notNullable()
      table.integer('people_number')
      table.integer('achievementId').unsigned()
      table.foreign('achievementId').references('achievements.id').onDelete('cascade')
      table.integer('responsibleId').unsigned()
      table.foreign('responsibleId').references('users.id')
      table.integer('valuerId').unsigned()
      table.foreign('valuerId').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('units')
  }
}

module.exports = UnitSchema
