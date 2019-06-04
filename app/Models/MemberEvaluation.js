'use strict'

const Model = use('Model')

class MemberEvaluation extends Model {
  member () {
    return this.belongsTo('App/Models/User', 'memberId')
  }

  evaluation () {
    return this.belongsTo('App/Models/Evaluation', 'evaluationId')
  }
}

module.exports = MemberEvaluation
