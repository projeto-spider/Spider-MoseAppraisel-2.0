'use strict'

const memberEvaluation = use('App/Models/MemberEvaluation')
/**
 * Resourceful controller for interacting with memberevaluations
 */
class MemberEvaluationController {
  /**
   * Show a list of all memberevaluations.
   * GET memberevaluations
   */
  async index ({ request, response, view }) {
    const memberObj = memberEvaluation
      .query()
      .with('member')
      .with('evaluation')
      .fetch()

    return memberObj
  }

  /**
   * Render a form to be used for creating a new memberevaluation.
   * GET memberevaluations/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new memberevaluation.
   * POST memberevaluations
   */
  async store ({ request, response }) {
    const {memberId, evaluationId} = request.post()

    const memberObj = await memberEvaluation.create({memberId, evaluationId})

    return memberObj
  }

  /**
   * Display a single memberevaluation.
   * GET memberevaluations/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing memberevaluation.
   * GET memberevaluations/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update memberevaluation details.
   * PUT or PATCH memberevaluations/:id
   */
  async update ({ params, request, response }) {
    const member = await memberEvaluation.findOrFail(params.id)

    const { memberConfirmation } = request.post()

    member.merge({ memberConfirmation })

    await member.save()

    return member
  }

  /**
   * Delete a memberevaluation with id.
   * DELETE memberevaluations/:id
   */
  async destroy ({ params, request, response }) {
  }

  existMember ({ request }) {
    const { memberId, evaluationId } = request.all()

    const member = memberEvaluation
      .query()
      .where('memberId', memberId)
      .where('evaluationId', evaluationId)

    return member
  }

  getMembers ({ params }) {
    const members = memberEvaluation
      .query()
      .where('evaluationId', params.id)
      .with('member')
      .fetch()

    return members
  }

  async memberConfirm ({ params, request }) {
    const member = await memberEvaluation.findOrFail(params.id)

    const { memberConfirmation } = request.post()

    member.merge({ memberConfirmation })

    await member.save()

    return member
  }
}

module.exports = MemberEvaluationController
