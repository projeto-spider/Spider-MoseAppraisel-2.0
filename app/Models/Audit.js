'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Audit extends Model {

  evaluations () {
    return this.belongsTo('App/Models/Evaluation', 'evaluationId')
  }

}

module.exports = Audit
