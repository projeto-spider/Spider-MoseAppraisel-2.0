'use strict'

const Model = use('Model')

class Profile extends Model {
  users () {
    return this
      .belongsToMany('App/Models/User', 'profileId', 'userId')
      .pivotModel('App/Models/UserProfile')
  }
}

module.exports = Profile
