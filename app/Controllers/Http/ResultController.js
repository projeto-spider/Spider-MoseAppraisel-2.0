'use strict'

const Result = use('App/Models/Result')

class ResultController {

  async index ({ request, response, view }) {
    const results = Result
      .query()
      .with('improvements')
      .fetch()

    return results
  }

  async store ({ request, response }) {
    const { practice, result, problem, evaluationId } = request.post()

    const resolution = await Result.create({ practice, result, problem, evaluationId })

    return resolution
  }

  async show ({ params, request, response, view }) {
    const result = await Result.findOrFail(params.id)

    if (!result) {
      return response.status(404).json({ message: 'Result not found!' })
    }

    return result
  }

  async update ({ params, request, response }) {
    const result = await Result.findOrFail(params.id)

    const data = request.only(['practice', 'result', 'problem'])

    result.merge(data)
    await result.save()
    return result
  }

  async destroy ({ params, request, response }) {
    const result = await Result.findOrFail(params.id)

    await result.delete()
  }

  async perPractice ({ request }) {
    const { evaluationId, practice } = request.all()

    const result = Result.query()
      .where('evaluationId', evaluationId)
      .where('practice', practice)
      .with('improvements')
      .fetch()

    return result
  }

  byEvaluationId ({ params }) {
    const results = Result.query().where('evaluationId', params.id)

    return results
  }
}

module.exports = ResultController
