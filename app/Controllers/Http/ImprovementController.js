'use strict'

const Improvement = use('App/Models/Improvement')

class ImprovementController {

  async index ({ request, response, view }) {
    const improvements = Improvement.all()

    return improvements
  }

  async store ({ request, response }) {
    const { solution, solutionDate, status, resultId, memberId } = request.post()

    const improvement = await Improvement.create({ solution, solutionDate, status, resultId, memberId })

    return improvement
  }

  async show ({ params, request, response, view }) {
    const improvement = await Improvement.findOrFail(params.id)

    if (!improvement) {
      return response.status(404).json({ message: 'Improvement not found!' })
    }

    return improvement
  }

  async update ({ params, request, response }) {
    const improvement = await Improvement.findOrFail(params.id)

    const data = request.only(['solution', 'solutionDate', 'status', 'memberId'])

    improvement.merge(data)
    await improvement.save()
    
    return improvement
  }

  async destroy ({ params, request, response }) {
    const improvement = await Improvement.findOrFail(params.id)

    await improvement.delete()
  }

  async perResult ({ params }) {
    const improvement = Improvement
      .query()
      .where('resultId', params.id)
      .with('members')
      .fetch()

    return improvement
  }
}

module.exports = ImprovementController
