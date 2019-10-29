const path = require('path')
const express = require('express')
const xss = require('xss')
// const ListsService = require('./lists-service')
const UsersService = require('./users-service')

const authRouter = express.Router()
const jsonParser = express.json()

authRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    const email = req.query.email
    const pass = req.query.pass

    UsersService.getCredentialsByEmail(knexInstance, email)
      .then(credentials => {
          console.log(credentials)
        // res.json(folders.map(serializeFolder))
        res.json(credentials)
      })
      .catch(next)
  })
    