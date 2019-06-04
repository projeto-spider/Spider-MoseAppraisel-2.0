'use strict'

const Model = use('Model')

class Team extends Model {
  member () {
    return this.belongsTo('App/Models/User', 'userId')
  }

  unit () {
    return this.belongsTo('App/Models/Unit', 'unitId')
  }

  roles () {
    return this
      .belongsToMany('App/Models/EvidenceFont', 'memberId', 'evidenceFontId')
      .pivotTable('member_roles')
  }

  evaluations () {
    return this
      .belongsToMany('App/Models/Evaluation', 'memberId', 'evaluationId')
      .pivotTable('member_roles')
  }
}

module.exports = Team
