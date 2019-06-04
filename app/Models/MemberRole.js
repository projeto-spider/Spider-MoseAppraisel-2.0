'use strict'

const Model = use('Model')

class MemberRole extends Model {
  members () {
    return this.belongsTo('App/Models/Team', 'memberId')
  }
}

module.exports = MemberRole
