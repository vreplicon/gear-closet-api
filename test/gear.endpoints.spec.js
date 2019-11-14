const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray } = require('./users.fixtures')
const {makeGearArray, makeUpdatedGear} = require('./gear.fixtures')


describe('Gear Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE gear, users RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE gear, users RESTART IDENTITY CASCADE'))

  describe(`GET /api/gear/user/:user_id`, () => {
    context(`Given id does not exist`, () => {
    })

    context('Given id does exist', () => {
        context(`Given there is no gear for user`, () => {
			it(`responds with 200 and an empty list`, () => {

			})
		})
		context(`Given there is gear for user`, () => {
			it(`Returns gear for user`, () => {

			})
		})
    })
})

	describe(`POST /api/gear`, () => {
		const testUsers = makeUsersArray();
    	beforeEach('insert test users', () => {
			return db
				.into('users')
				.insert(testUsers)
    })

    it(`creates a piece gear, responding with 201 and the new gear`, () => {
      const newGear = {
        user_id: 1,
        gear_name: 'Quickdraw',
        gear_type: 'Rock Climbing',
		gear_weight: 4.0,
		weight_unit: 'oz',
		notes: 'Made by Black Diamond'
      }
      return supertest(app)
        .post('/api/gear')
        .send(newGear)
        .expect(201)
        .expect(res => {
          expect(res.body.user_id).to.eql(newGear.user_id)
          expect(res.body.gear_name).to.eql(newGear.gear_name)
		  expect(res.body.gear_type).to.eql(newGear.gear_type)
		  expect(res.body.gear_weight).to.eql(newGear.gear_weight)
		  expect(res.body.weight_unit).to.eql(newGear.weight_unit)
		  expect(res.body.notes).to.eql(newGear.notes)
          expect(res.body).to.have.property('id')
        })
    })

    const requiredFields = ['gear_name', 'user_id', 'gear_type']

    requiredFields.forEach(field => {
      const newGear = {
        gear_name: 'Test new gear',
        user_id: 1,
        gear_type: 'Rock Climbing'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newGear[field]

        return supertest(app)
          .post('/api/gear')
          .send(newGear)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })


	})

	describe(`DELETE /api/gear/:gear_id`, () => {
		context(`Given no gear`, () => {
			it(`responds with 404`, () => {
			  const gearId = 123456
			  return supertest(app)
				.delete(`/api/gear/${gearId}`)
				.expect(404, { error: { message: `Gear doesn't exist` } })
			})
		  })
	  
		  context('Given there is gear in the database', () => {
			const testUsers = makeUsersArray();
			const testGear = makeGearArray()
	  
			beforeEach('insert gear', () => {
			  return db
				.into('users')
				.insert(testUsers)
				.then(() => {
				  return db
					.into('gear')
					.insert(testGear)
				})
			})
	  
			it('responds with 204 and removes the gear', () => {
			  const idToRemove = 2
			  const expectedGear = testGear.filter(gear => gear.id !== idToRemove)
			  return supertest(app)
				.delete(`/api/gear/${idToRemove}`)
				.expect(204)
				.then(res =>
				  supertest(app)
					.get(`/api/gear/user/1`)
					.expect(expectedGear)
				)
			})
	})
	})
	describe(`PATCH /api/gear/:gear_id`, () => {
		context(`Given no gear`, () => {
			it(`responds with 404`, () => {
			  const gearId = 123456
			  return supertest(app)
				.delete(`/api/gear/${gearId}`)
				.expect(404, { error: { message: `Gear doesn't exist` } })
			})
		  })
	  
		  context('Given there is gear in the database', () => {
			const testUsers = makeUsersArray();
			const testGear = makeGearArray()
	  
			beforeEach('insert gear', () => {
			  return db
				.into('users')
				.insert(testUsers)
				.then(() => {
				  return db
					.into('gear')
					.insert(testGear)
				})
			})
	  
			it('responds with 204 and updates the gear', () => {
			  const idToUpdate = 2
			  const expectedGear = makeUpdatedGear()
			  const updatedGear = {
				  gear_name: 'updated gear name',
				notes: 'updated notes'
			  }

			  return supertest(app)
				.patch(`/api/gear/${idToUpdate}`)
				.send(updatedGear)
				.expect(204)
				.then(res =>
				  supertest(app)
					.get(`/api/gear/user/1`)
					.expect(expectedGear)
				)
			})
	  
			it(`responds with 400 when no required fields supplied`, () => {
			  const idToUpdate = 2
			  return supertest(app)
				.patch(`/api/gear/${idToUpdate}`)
				.send({ irrelevantField: 'foo' })
				.expect(400, {
				  error: {
					message: `Request body must contain user_id, gear_name, gear_type, gear_weight, weight_unit, or notes`
				  }
				})
			})
	  
			// it(`responds with 204 when updating only a subset of fields`, () => {
			//   const idToUpdate = 2
			//   const updatedGear = {
			// 	gear_name: 'updated gear_name',
			//   }
			//   const expectedGear = makeUpdatedGear()
	  
			//   return supertest(app)
			// 	.patch(`/api/gear/${idToUpdate}`)
			// 	.send({
			// 	  ...updatedGear,
			// 	  fieldToIgnore: 'should not be in GET response'
			// 	})
			// 	.expect(204)
			// 	.then(res =>
			// 	  supertest(app)
			// 		.get(`/api/gear/${idToUpdate}`)
			// 		.expect(expectedGear[idToUpdate-1])
			// 	)
	// })
})
	})
	})

