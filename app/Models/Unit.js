'use strict'

const Model = use('Model')

class Unit extends Model {
  achievements () {
    return this.belongsTo('App/Models/Achievement', 'achievementId')
  }

  evaluations () {
    return this.hasMany('App/Models/Evaluation', 'id', 'unitId')
  }

  evidenceFonts () {
    return this.hasMany('App/Models/EvidenceFont', 'id', 'unitId')
  }

  members () {
    return this
      .belongsToMany('App/Models/UserProfile', 'unitId', 'userId')
      .pivotTable('teams')
  }

  responsible () {
    return this.belongsTo('App/Models/User', 'responsibleId')
  }

  valuer () {
    return this.belongsTo('App/Models/User', 'valuerId')
  }
}

module.exports = Unit
