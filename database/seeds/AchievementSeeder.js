'use strict'

/*
|--------------------------------------------------------------------------
| AchievementSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Achievement = use('App/Models/Achievement')

class AchievementSeeder {
  async run () {
    await Achievement.create({
      name: 'Achievement 1',
      cnpj: '2315648',
      phone: '8033-3265',
      adress: 'Lorem inpsum dolor sit amet, 23, Cidadella, Brasil',
      sponsorId: 3,
      valuerId: 2
    })

    await Achievement.create({
      name: 'Achievement 2',
      cnpj: '245689',
      phone: '8032-2154',
      adress: 'Sit amet inpsum Lorem, 54, Marulos, Brasil',
      sponsorId: 3,
      valuerId: 2
    })
  }
}

module.exports = AchievementSeeder
