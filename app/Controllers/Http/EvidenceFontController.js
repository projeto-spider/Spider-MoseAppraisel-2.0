'use strict'

const EvidenceFont = use('App/Models/EvidenceFont')

class EvidenceFontController {
  async index ({ request, response }) {
    const evidenceFont = EvidenceFont.all()

    return evidenceFont
  }

  async store ({ request, response }) {
    const {unitId, role, skills} = request.post()

    const evidenceFont = await EvidenceFont.create({unitId, role, skills})

    return evidenceFont
  }

  async show ({params, request, response}) {
    const evidenceFont = await EvidenceFont.findOrFail(params.id)

    if (!evidenceFont) {
      return response.status(404).json({ message: 'Evidence font not found!' })
    }

    return evidenceFont
  }

  async update ({ params, request, response }) {
    const evidenceFont = await EvidenceFont.findOrFail(params.id)

    const {unitId, role, skills} = request.post()

    evidenceFont.merge({unitId, role, skills})

    await evidenceFont.save()
    return evidenceFont
  }

  async destroy ({ params, request, response }) {
    const evidenceFont = await EvidenceFont.findOrFail(params.id)

    await evidenceFont.delete()
  }

  byUnitId ({ params }) {
    var evidenceFont = EvidenceFont.query().where('unitId', params.id)

    return evidenceFont
  }
}

module.exports = EvidenceFontController
