'use strict'

/*
|--------------------------------------------------------------------------
| EvaluationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Evaluation = use('App/Models/Evaluation')

class EvaluationSeeder {
  async run () {
    await Evaluation.create({
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Lorem',
      partner: 'Inpsun',
      startDate: new Date('Wed May 20 2017 00:00:00 GMT-0300 (Horário Padrão de Brasília)'),
      endDate: new Date('Tue Oct 10 2017 00:00:00 GMT-0300 (Horário Padrão de Brasília)'),
      valuerConfirmation: false,
      responsibleConfirmation: false,
      sponsorConfirmation: false,
      unitId: 1,
      valuerId: 2,
      responsibleId: 4
    })
    await Evaluation.create({
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Dolor',
      partner: 'Sit Amet',
      startDate: new Date('Wed May 16 2018 23:21:01 GMT-0300 (Horário Padrão de Brasília)'),
      endDate: new Date('Mon Jul 30 2018 23:21:01 GMT-0300 (Horário Padrão de Brasília)'),
      valuerConfirmation: false,
      responsibleConfirmation: false,
      sponsorConfirmation: false,
      unitId: 1,
      valuerId: 2,
      responsibleId: 4
    })
    await Evaluation.create({
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Inpsun Dolor',
      partner: 'Sit Amet',
      startDate: new Date('Wed May 20 2017 00:00:00 GMT-0300 (Horário Padrão de Brasília)'),
      endDate: new Date('Tue Oct 10 2017 00:00:00 GMT-0300 (Horário Padrão de Brasília)'),
      valuerConfirmation: false,
      responsibleConfirmation: false,
      sponsorConfirmation: false,
      unitId: 2,
      valuerId: 6,
      responsibleId: 4
    })
    await Evaluation.create({
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Inpsun Dolor',
      partner: 'Sit',
      startDate: new Date('Wed May 16 2018 23:21:01 GMT-0300 (Horário Padrão de Brasília)'),
      endDate: new Date('Mon Jul 30 2018 23:21:01 GMT-0300 (Horário Padrão de Brasília)'),
      valuerConfirmation: false,
      responsibleConfirmation: false,
      sponsorConfirmation: false,
      unitId: 1,
      valuerId: 2,
      responsibleId: 4
    })
  }
}

module.exports = EvaluationSeeder
