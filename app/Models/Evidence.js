'use strict'

const Model = use('Model')

class Evidence extends Model {
  evaluations () {
    return this.belongsTo('App/Models/Evaluation', 'evaluationId')
  }

  member () {
    return this.belongsTo('App/Models/User', 'memberId')
  }

  evidenceFont () {
    return this.belongsTo('App/Models/EvidenceFont', 'evidenceFontId')
  }
}

module.exports = Evidence
