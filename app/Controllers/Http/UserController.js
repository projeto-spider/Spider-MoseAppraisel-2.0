'use strict'

const User = use('App/Models/User')
const Achievement = use('App/Models/Achievement')
const Unit = use('App/Models/Unit')
const Hash = use('Hash')

class UserController {
  async index () {
    const users = User
      .query()
      .with('profiles')
      .fetch()

    return users
  }

  async me ({ auth, params }) {
    const authenticated = await auth.getUser()
    const user = await User.findOrFail(authenticated.id)
    const profiles = await user.profiles().fetch()

    user.profiles = profiles

    return user
  }

  async store ({ request }) {
    const {username, email, password, profiles} = request.post()

    const user = await User.create({username, email, password})

    if (profiles && profiles.length > 0) {
      await user.profiles().attach(profiles)
    }

    return user
  }

  async show ({ params, response }) {
    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found!' })
    }

    const profiles = await user.profiles().fetch()

    user.profiles = profiles

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)

    const data = request.only(['username', 'email', 'profiles'])

    user.merge(data)
    await user.save()

    if (data.profiles && data.profiles.length > 0) {
      await user.profiles().detach()
      await user.profiles().attach(data.profiles)
      user.profiles = await user.profiles().fetch()
    }

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.profiles().detach()

    await user.delete()
  }

  async ids ({ request }) {
    const userIds = await User.ids()

    return userIds
  }

  async sponsorAchievements ({ params }) {
    const achievements = Achievement.query().where('sponsorId', params.id)
      .with('units')
      .fetch()

    return achievements
  }

  async valuerAchivements ({ params }) {
    const achievements = Achievement.query().where('valuerId', params.id)
      .with('units')
      .fetch()

    return achievements
  }

  async unitAchievements ({ params }) {
    var units = Unit.query().where('responsibleId', params.id)
      .with('evaluations')
      .with('evidenceFonts')
      .with('responsible')
      .with('members')
      .fetch()

    return units
  }

  async changePassword ({ request, auth, response }) {
    const user = auth.current.user

    const verifyPassword = await Hash.verify(
        request.input('password'),
        user.password
    )

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message: 'Bad credentials! Please try again.'
      })
    }

    user.password = await Hash.make(request.input('newPassword'))
    await user.save()

    return response.json({
      status: 'success',
      message: 'Password updated!'
    })
  }
}

module.exports = UserController
