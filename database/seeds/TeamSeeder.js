'use strict'

/*
|--------------------------------------------------------------------------
| TeamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Team = use('App/Models/Team')

class TeamSeeder {
  async run () {
    await Team.create({
      userId: 5,
      unitId: 1
    })

    await Team.create({
      userId: 5,
      unitId: 2
    })

    await Team.create({
      userId: 6,   
      unitId: 1
    })

    await Team.create({
      userId: 7,
      unitId: 1
    })
  }
}

module.exports = TeamSeeder
