'use strict'

const Schema = use('Schema')

class EvaluationSchema extends Schema {
  up () {
    this.create('evaluations', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('status').notNullable()
      table.string('contractor').notNullable()
      table.string('partner').notNullable()
      table.dateTime('startDate')
      table.dateTime('endDate')
      table.boolean('colorFinal').defaultTo(false)
      table.boolean('planFinal').defaultTo(false)
      table.boolean('valuerConfirmation').defaultTo(false)
      table.boolean('responsibleConfirmation').defaultTo(false)
      table.boolean('sponsorConfirmation').defaultTo(false)
      table.integer('unitId').unsigned()
      table.foreign('unitId').references('units.id').onDelete('cascade')
      table.integer('valuerId').unsigned()
      table.foreign('valuerId').references('users.id')
      table.integer('responsibleId').unsigned()
      table.foreign('responsibleId').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('evaluations')
  }
}

module.exports = EvaluationSchema
