'use strict'

const Schema = use('Schema')

class MemberRoleSchema extends Schema {
  up () {
    this.create('member_roles', (table) => {
      table.increments()
      table.integer('memberId').unsigned()
      table.foreign('memberId').references('teams.id')
      table.integer('evidenceFontId').unsigned()
      table.foreign('evidenceFontId').references('evidence_fonts.id')
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('member_roles')
  }
}

module.exports = MemberRoleSchema
