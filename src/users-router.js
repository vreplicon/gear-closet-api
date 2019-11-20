const path = require('path')
const express = require('express')
const UsersService = require('./users-service')
const GearService = require('./gear-service')
const ListsService = require('./lists-service')
const LookupService = require('./lookup-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
  .route('/sign-in')
  .all(jsonParser, (req, res, next) => {
    UsersService.getIdByEmail(
      req.app.get('db'),
      req.body.email
    )
      .then(id => {

        res.id = id
        next()
      })
      .catch(next)
  })
  .post((req, res, next) => {
        if (!res.id) {
          return res.status(404).json({
            error: { message: `User not found` }
          })
        } else {
            res
            .json(res.id)
        }   
    
      next()
  })
  usersRouter
  .route('/sign-up')
  .all(jsonParser, (req, res, next) => {
    UsersService.getIdByEmail(
      req.app.get('db'),
      req.body.email
    )
      .then(id => {

        req.id = id
        next()
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
        if (req.id) {
            return res.status(400).json({
            error: { message: `User already registered` }
          })
        } else {
            const { email } = req.body
            const newUser = { email }
            UsersService.addNewUser(
                req.app.get('db'),
                newUser
            ).then(newUser => {
                  res.newUser = newUser
                  const exampleGear = {
                    user_id : newUser.id,
                    gear_name : "My first piece of gear",
                    gear_type : "Camping",
                    gear_weight : null,
                    weight_unit : null,
                    notes : "This is your first piece of gear! It can be a tent, camping chair, climbing shoes, or whatever you want it to be. Just click edit to change the attributes of it, or click the add gear button above to make your own from scratch."
                  }

                  GearService.addNewGear(req.app.get('db'), exampleGear
            ).then(newGear => {
              res.newGear = newGear
              const exampleList = {
                user_id : newGear.user_id,
                list_name : "My First List",
                list_description : "This is an example of a list! You can make one of these for any trip you plan on going on in the future to help you pack and plan. You will be able to add any piece of gear to it that you have entered into your gear database."
              }

              ListsService.addNewList(res.app.get('db'), exampleList)
              .then(newList => {
                LookupService.addNewLookup(res.app.get('db'), [res.newGear], newList)
                .then(() => res.status(201).json(res.newUser))
              }
            
          
        
            

            )
               
            }
            )}
                ).catch(next)
        }   
    
})

module.exports = usersRouter