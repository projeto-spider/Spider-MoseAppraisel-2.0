'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin'
    })

    await User.create({
      username: 'valuer',
      email: 'valuer@example.com',
      password: '123456'
    })

    await User.create({
      username: 'sponsor',
      email: 'sponsor@example.com',
      password: '123456'
    })

    await User.create({
      username: 'responsible',
      email: 'responsible@example.com',
      password: '123456'
    })

    await User.create({
      username: 'member',
      email: 'member@example.com',
      password: '123456'
    })

    await User.create({
      username: 'example1',
      email: 'example1@example.com',
      password: '123456'
    })

    await User.create({
      username: 'example2',
      email: 'example2@example.com',
      password: '123456'
    })

    await User.create({
      username: 'example3',
      email: 'example3@example.com',
      password: '123456'
    })
  }
}

module.exports = UserSeeder
