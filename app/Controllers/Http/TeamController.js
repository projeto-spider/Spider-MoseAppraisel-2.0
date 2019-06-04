'use strict'

const Team = use('App/Models/Team')

class TeamController {
  async index ({ request, response, view }) {
    const team = Team
    .query()
    .with('roles')
    .with('evaluations')
    .fetch()

    return team
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }

  byUnitId ({ params }) {
    var team = Team.query().where('unitId', params.id).with('member').fetch()

    return team
  }

  byUserId ({ params }) {
    var team = Team.query()
      .where('userId', params.id)
      .with('member')
      .with('unit')
      .fetch()

    return team
  }
}

module.exports = TeamController
