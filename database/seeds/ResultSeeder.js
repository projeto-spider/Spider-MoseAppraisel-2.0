'use strict'

/*
|--------------------------------------------------------------------------
| ResultSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Result = use('App/Models/Result')

class ResultSeeder {
  async run () {

    await Result.create({
      result: 'passou'})

    await Result.create({
      result: 'th1'})

    await Result.create({
      result: 'problema1'})

    await Result.create({
      result: 1})

    await Result.create({
      result: 1})
  }
}
module.exports = ResultSeeder



