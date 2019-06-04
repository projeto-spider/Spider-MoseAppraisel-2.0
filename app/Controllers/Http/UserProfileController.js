'use strict'

const UserProfile = use('App/Models/UserProfile')
const User = use('App/Models/User')

class UserProfileController {
  async index ({ request, response }) {
    const userProfile = await UserProfile
      .query()
      .with('achievements')
      .fetch()

    return userProfile
  }

  async store ({ request }) {
    const {userId, profileId, achievements} = request.post()

    const userProfile = await UserProfile.create({ userId, profileId })

    if (achievements && achievements.length > 0) {
      await userProfile.achievements().attach(achievements)
    }

    return userProfile
  }
}

module.exports = UserProfileController
