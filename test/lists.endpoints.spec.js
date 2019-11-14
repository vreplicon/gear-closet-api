const knex = require('knex')
const app = require('../src/app')
// const { makeNotesArray, makeMaliciousNote } = require('./notes.fixtures')
// const { makeFoldersArray } = require('./folders.fixtures')

describe('Lists Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE lists, gear, users RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE lists, gear, users RESTART IDENTITY CASCADE'))

  describe(`GET /api/lists/user/:user_id`, () => {
    context(`Given id does not exist`, () => {
    })

    context('Given id does exist', () => {
        context(`Given there is no lists for user`, () => {
			it(`responds with 200 and an empty list`, () => {

			})
		})
		context(`Given there are lists for user`, () => {
			it(`Returns lists for user`, () => {

			})
		})
    })
})

	describe(`POST /api/lists`, () => {

	})

	describe(`DELETE /api/lists/:list_id`, () => {

	})

	describe(`PATCH /api/lists/:list_id`, () => {
		
	})
})
