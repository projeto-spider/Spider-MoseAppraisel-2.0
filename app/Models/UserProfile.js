'use strict'

const Model = use('Model')

class UserProfile extends Model {
  users () {
    return this
      .belongsToMany('App/Models/User')
  }

  achievements () {
    return this
      .belongsToMany('App/Models/Achievement', 'userProfileId', 'achievementId')
      .pivotTable('profile_achievements_teams')
  }
}

module.exports = UserProfile
