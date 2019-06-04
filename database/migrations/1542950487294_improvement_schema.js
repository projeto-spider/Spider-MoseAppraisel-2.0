'use strict'

const Schema = use('Schema')

class ImprovementSchema extends Schema {
  up () {
    this.create('improvements', (table) => {
      table.increments()
      table.string('solution')
      table.string('solutionDate')
      table.string('status')
      table.integer('resultId').unsigned()
      table.foreign('resultId').references('results.id').onDelete('cascade')
      table.integer('memberId').unsigned()
      table.foreign('memberId').references('users.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('improvements')
  }
}

module.exports = ImprovementSchema
