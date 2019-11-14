const knex = require('knex')
const app = require('../src/app')
// const { makeNotesArray, makeMaliciousNote } = require('./notes.fixtures')
// const { makeFoldersArray } = require('./folders.fixtures')

describe('User Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'))

  describe(`POST /api/users/sign-up`, () => {
    context(`Given email is not registered`, () => {
      it(`responds with 200 and that user`, () => {
        const user = {
            id: 1,
            email: "joe@smith.com"
        }

        return supertest(app)
          .post('/api/users/sign-up')
          .send(user)
          .expect(201, user)
      })
    })

    context(`Given email is already registered`, () => {
        beforeEach('insert user', () => {
            const user = {
                id: 1,
                email: "joe@smith.com"
            }
            return db
              .into('users')
              .insert(user)
        })


        it(`responds with 400`, () => {
            const user = {
                id: 1,
                email: "joe@smith.com"
            }
    
            return supertest(app)
              .post('/api/users/sign-up')
              .send(user)
              .expect(400, { error: { message: `User already registered` } })
        })

    })       
})

describe(`POST /api/users/sign-in`, () => {
    context(`Given email is not registered`, () => {
      it(`responds with 404`, () => {
        const user = {
            id: 1,
            email: "joe@smith.com"
        }

        return supertest(app)
          .post('/api/users/sign-in')
          .send(user)
          .expect(404, { error: { message: `User not found` } })
      })
    })

    context(`Given email is already registered`, () => {
        beforeEach('insert user', () => {
            const user = {
                id: 1,
                email: "joe@smith.com"
            }
            return db
              .into('users')
              .insert(user)
        })


        it(`responds with 200 and users id`, () => {
            const user = {
                id: 1,
                email: "joe@smith.com"
            }
    
            return supertest(app)
              .post('/api/users/sign-in')
              .send(user)
              .expect(200, {id:1})
        })

    })       
})

})
   