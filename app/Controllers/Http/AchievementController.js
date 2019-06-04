'use strict'

const Achievement = use('App/Models/Achievement')
const User = use('App/Models/User')

class AchievementController {
  async index () {
    return await Achievement
      .query()
      .with('units')
      .with('sponsor')
      .fetch()
  }

  async store ({ request, response }) {
    const {name, cnpj, phone, adress, valuerId} = request.post()

    const achievement = await Achievement.create({name, cnpj, phone, adress, valuerId})

    return achievement
  }

  async show ({ request, params, response }) {
    const achievement = await Achievement.findOrFail(params.id)

    if (!achievement) {
      return response.status(404).json({ message: 'Achievement not found!' })
    }

    const units = await achievement.units().fetch()
    achievement.units = units

    if (achievement.sponsorId) {
      const sponsor = await User.find(achievement.sponsorId)
      achievement.sponsor = sponsor
    }

    if (achievement.valuerId) {
      const valuer = await User.find(achievement.valuerId)
      achievement.valuer = valuer
    }

    return achievement
  }

  async update ({ params, request, response }) {
    const achievement = await Achievement.findOrFail(params.id)

    const data = request.only(['name', 'cnpj', 'phone', 'adress', 'sponsorId', 'valuerId'])

    achievement.merge(data)
    await achievement.save()
    return achievement
  }

  async destroy ({ params }) {
    const achievement = await Achievement.findOrFail(params.id)

    await achievement.delete()
  }
}

module.exports = AchievementController
