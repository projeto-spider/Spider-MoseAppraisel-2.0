'use strict'

const Schema = use('Schema')

class EvidenceFontSchema extends Schema {
  up () {
    this.create('evidence_fonts', (table) => {
      table.increments()
      table.string('role', 50)
      table.string('skills', 300)
      table.integer('unitId').unsigned()
      table.foreign('unitId').references('units.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('evidence_fonts')
  }
}

module.exports = EvidenceFontSchema
