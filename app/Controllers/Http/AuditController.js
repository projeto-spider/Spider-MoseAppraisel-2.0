'use strict'

const Audit = use('App/Models/Audit')


class AuditController {

  async index ({ request, response, view }) {
    const audit = Audit
      .query()
      .with('evaluations')
      .fetch()

    return audit
  }


  async store ({ request, response }){

    const data = request.only(['situation1','action1','situation2','action2','situation3','action3','situation4','action4'])

    const audit = await Audit.create(data)

    return audit
  }

  async show ({ params, request, response, view }) {
    const audit = await Audit.findOrFail(params.id)

    if (!audit) {
      return response.status(404).json({ message: 'Audit not found!' })
    }

    return audit
  }


  async update ({ params, request, response }) {
    const audit = await Audit.findOrFail(params.id)

    const {
      evaluationId,
      status,
      situation1,
      action1,
      situation2,
      action2,
      situation3,
      action3,
      situation4,
      action4
    } = request.post()

    audit
      .merge({
        evaluationId,
        status,
        situation1,
        action1,
        situation2,
        action2,
        situation3,
        action3,
        situation4,
        action4
      })

    await audit.save()
    return audit
  }

  async destroy ({ params }) {
    const audit = await Audit.findOrFail(params.id)

    await audit.delete()
  }


}

module.exports = AuditController
