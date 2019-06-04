'use strict'

const Schema = use('Schema')

class ResultSchema extends Schema {
  up () {
    this.create('results', (table) => {
      table.increments()
      table.string('result')
      table.string('practice')
      table.string('problem')
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('results')
  }
}

module.exports = ResultSchema
