'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuditSchema extends Schema {
  up () {
    this.create('audits', (table) => {
      table.increments()
      table.string('status').notNullable()
      table.string('item1').notNullable()
      table.string('situation1').notNullable()
      table.string('action1').notNullable()
      table.string('situation2').notNullable()
      table.string('action2').notNullable()
      table.string('situation3').notNullable()
      table.string('action3').notNullable()
      table.string('situation4').notNullable()
      table.string('action4').notNullable()
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('audits')
  }
}

module.exports = AuditSchema
