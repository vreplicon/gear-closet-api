const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

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
            ).then(newUser => 
                res.json(newUser)
            ).catch(next)
        }   
    
})

module.exports = usersRouter