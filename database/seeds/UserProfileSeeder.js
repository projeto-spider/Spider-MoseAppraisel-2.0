'use strict'

/*
|--------------------------------------------------------------------------
| UserProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Profile = use('App/Models/UserProfile')

class UserProfileSeeder {
  async run () {
    await Profile.create({
      userId: 1,
      profileId: 1
    })

    await Profile.create({
      userId: 2,
      profileId: 2
    })

    await Profile.create({
      userId: 3,
      profileId: 3
    })

    await Profile.create({
      userId: 4,
      profileId: 4
    })

    await Profile.create({
      userId: 5,
      profileId: 5
    })

    await Profile.create({
      userId: 6,
      profileId: 4
    })

    await Profile.create({
      userId: 7,
      profileId: 2
    })

    await Profile.create({
      userId: 8,
      profileId: 4
    })

    await Profile.create({
      userId: 6,
      profileId: 5
    })

    await Profile.create({
      userId: 7,
      profileId: 5
    })
  }
}

module.exports = UserProfileSeeder
