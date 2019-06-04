'use strict'

const Schema = use('Schema')

class AchievementSchema extends Schema {
  up () {
    this.create('achievements', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.string('cnpj').unique().notNullable()
      table.string('phone').notNullable()
      table.string('adress').notNullable()
      table.integer('sponsorId').unsigned()
      table.foreign('sponsorId').references('users.id').onDelete('cascade')
      table.integer('valuerId').unsigned()
      table.foreign('valuerId').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('achievements')
  }
}

module.exports = AchievementSchema
