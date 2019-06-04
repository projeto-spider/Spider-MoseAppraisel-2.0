'use strict'

/*
|--------------------------------------------------------------------------
| EvidenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Evidence = use('App/Models/Evidence')

class EvidenceSeeder {
  async run () {
    await Evidence.create({
      url: 'www.example.com',
      practice: 'TH 1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example1.com',
      practice: 'TH 1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example2.com',
      practice: 'TH 1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example3.com',
      practice: 'IN 1',
      evaluationId: 2
    })
  }
}

module.exports = EvidenceSeeder
