'use strict'

const Evidence = use('App/Models/Evidence')

class EvidenceController {
  async index ({ request, response }) {
    const evidence = Evidence.all()

    return evidence
  }

  async store ({ request, response }) {
    const {url, practice, evaluationId, memberId, evidenceFontId} = request.post()

    const evidence = await Evidence.create({url, practice, evaluationId, memberId, evidenceFontId})

    return evidence
  }

  async show ({params, request, response}) {
    const evidence = await Evidence.findOrFail(params.id)

    if (!evidence) {
      return response.status(404).json({ message: 'Evidence not found!' })
    }

    return evidence
  }

  async update ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    const {url, font, result, problems} = request.post()

    evidence.merge({url, font, result, problems})

    await evidence.save()
    return evidence
  }

  async destroy ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    await evidence.delete()
  }

  async perPractice ({ request }) {
    const { evaluationId, practice } = request.all()

    const evidences = Evidence.query()
      .where('evaluationId', evaluationId)
      .where('practice', practice)
      .with('member')
      .with('evidenceFont')
      .fetch()

    return evidences
  }
}

module.exports = EvidenceController
