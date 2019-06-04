'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.string('practice').notNullable()
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id').onDelete('cascade')
      table.integer('memberId').unsigned()
      table.foreign('memberId').references('users.id').onDelete('cascade')
      table.integer('evidenceFontId').unsigned()
      table.foreign('evidenceFontId').references('evidence_fonts.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('evidences')
  }
}

module.exports = EvidenceSchema
