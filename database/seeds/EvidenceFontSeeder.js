'use strict'

/*
|--------------------------------------------------------------------------
| EvidenceFontSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const EvidenceFont = use('App/Models/EvidenceFont')

class EvidenceFontSeeder {
  async run () {
    await EvidenceFont.create({
      role: 'Gerente de projetos',
      skills: 'Trabalha bem',
      unitId: 1
    })

    await EvidenceFont.create({
      role: 'Analista de requisitos',
      skills: 'Legal com os clientes',
      unitId: 2
    })

    await EvidenceFont.create({
      role: 'Programador',
      skills: 'Só chora',
      unitId: 1
    })
  }
}

module.exports = EvidenceFontSeeder
