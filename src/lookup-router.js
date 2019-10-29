const path = require('path')
const express = require('express')
const xss = require('xss')
const LookupService = require('./lookup-service')

const lookupRouter = express.Router()
const jsonParser = express.json()

// const serializeFolder = folder => ({
//   id: folder.id,
//   folder_name : xss(folder.folder_name)
// })

lookupRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LookupService.getAllLookups(knexInstance)
      .then(lookups => {
        // res.json(folders.map(serializeFolder))
        res.json(lookups)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { user_id, gear_id, list_id } = req.body
    const newLookup = { user_id, gear_id, list_id }

    for (const [key, value] of Object.entries(newLookup)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    LookupService.addNewLookup(
      req.app.get('db'),
      newLookup
    )
      .then(lookup => {
        res
          .status(201)
        //   .location(path.posix.join(req.originalUrl, `/${gear.id}`))
          .json(lookup)
      })
      .catch(next)
  })

lookupRouter
  .route('/q')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LookupService.getByUser(knexInstance, req.query.user)
      .then(lookups => {
        // res.json(folders.map(serializeFolder))
        res.json(lookups)
      })
      .catch(next)
  })

module.exports = lookupRouter