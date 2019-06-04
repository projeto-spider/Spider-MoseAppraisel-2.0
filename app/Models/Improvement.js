'use strict'

const Model = use('Model')

class Improvement extends Model {
  results () {
    return this.belongsTo('App/Models/Result', 'resultId')
  }

  members () {
    return this.belongsTo('App/Models/User', 'memberId')  
  }
}

module.exports = Improvement
