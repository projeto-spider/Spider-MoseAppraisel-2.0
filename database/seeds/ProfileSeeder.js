'use strict'

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Profile = use('App/Models/Profile')

class ProfileSeeder {
  async run () {
    await Profile.create({
      profile: 'administrador'
    })

    await Profile.create({
      profile: 'avaliador'
    })

    await Profile.create({
      profile: 'patrocinador'
    })

    await Profile.create({
      profile: 'responsável'
    })

    await Profile.create({
      profile: 'time'
    })
  }
}

module.exports = ProfileSeeder
