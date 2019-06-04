'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  profiles () {
    return this
      .belongsToMany('App/Models/Profile', 'userId', 'profileId')
      .pivotModel('App/Models/UserProfile')
  }

  achievements () {
    return this.hasMany('App/Models/Achievement')
  }

  units () {
    return this.hasMany('App/Models/Unit')
  }

  participates () {
    return this
      .belongsToMany('App/Models/Unit', 'userId', 'unitId')
      .pivotTable('teams')
  }

  evaluations () {
    return this.hasMany('App/Models/Evaluation')
  }

  improvements () {
    return this.hasMany('App/Models/Improvement')
  }

  evidences () {
    return this.hasMany('App/Models/Evidences')
  }
}

module.exports = User
