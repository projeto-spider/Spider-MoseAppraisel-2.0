'use strict'

const Model = use('Model')

class Result extends Model {
  evaluations () {
    return this.belongsTo('App/Models/Evaluation', 'evaluationId')
  }

  improvements () {
    return this.hasOne('App/Models/Improvement', 'id', 'resultId')
  }
}

module.exports = Result
