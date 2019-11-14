const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray } = require('./users.fixtures')
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
		const testUsers = makeUsersArray();
    	beforeEach('insert test users', () => {
			return db
				.into('users')
				.insert(testUsers)
    })


        it(`creates a list, responding with 201 and the new list`, () => {
            const newList = {
              user_id: 1,
              list_name: 'Quickdraw',
              list_description: 'Something',
                gear: []
            }
            return supertest(app)
              .post('/api/lists')
              .send(newList)
              .expect(201)
              .expect(res => {
                expect(res.body.user_id).to.eql(newList.user_id)
                expect(res.body.list_name).to.eql(newList.list_name)
                expect(res.body.list_description).to.eql(newList.list_description)
                expect(res.body.gear).to.eql(newList.gear)
                expect(res.body).to.have.property('id')
              })
          })
	})

	describe(`DELETE /api/lists/:list_id`, () => {

	})

	describe(`PATCH /api/lists/:list_id`, () => {
		
	})
})
