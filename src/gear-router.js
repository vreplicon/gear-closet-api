const path = require('path')
const express = require('express')
const xss = require('xss')
const GearService = require('./gear-service')

const gearRouter = express.Router()
const jsonParser = express.json()

// const serializeFolder = folder => ({
//   id: folder.id,
//   folder_name : xss(folder.folder_name)
// })

gearRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    GearService.getAllGear(knexInstance)
      .then(gear => {
          res.json(gear)
        // res.json(folders.map(serializeFolder))
      })
      .catch(next)
  })
    .post(jsonParser, (req, res, next) => {
        const { user_id, gear_name, gear_type, gear_weight, weight_unit, notes } = req.body
        const newGear = { user_id, gear_name, gear_type, gear_weight, weight_unit, notes }
        const requireFields = {user_id, gear_name, gear_type}

        for (const [key, value] of Object.entries(requireFields)) {
        if (value == null) {
            return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
            })
        }
        }

        GearService.addNewGear(
        req.app.get('db'),
        newGear
        )
        .then(gear => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${gear.id}`))
            .json(gear)
        })
        .catch(next)
    })

    gearRouter
        .route('/user/:user_id')
        .get((req, res, next) => {
            const knexInstance = req.app.get('db')
            GearService.getByUser(knexInstance, req.params.user_id)
              .then(gear => {
                  res.json(gear)
                // res.json(folders.map(serializeFolder))
              })
              .catch(next)
          })

    // foldersRouter
    // .route('/:folder_id')
    // .all((req, res, next) => {
    //     FoldersService.getById(
    //     req.app.get('db'),
    //     req.params.folder_id
    //     )
    //     .then(folder => {
    //         if (!folder) {
    //         return res.status(404).json({
    //             error: { message: `Folder doesn't exist` }
    //         })
    //         }
    //         res.folder = folder
    //         next()
    //     })
    //     .catch(next)
    // })
    // .get((req, res, next) => {
    //     res.json(serializeFolder(res.folder))
    // })
    // .delete((req, res, next) => {
    //     FoldersService.deleteFolder(
    //     req.app.get('db'),
    //     req.params.folder_id
    //     )
    //     .then(numRowsAffected => {
    //         res.status(204).end()
    //     })
    //     .catch(next)
    // })
    // .patch(jsonParser, (req, res, next) => {
    //     const { folder_name} = req.body
    //     const folderToUpdate = { folder_name }

    //     const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
    //     if (numberOfValues === 0)
    //     return res.status(400).json({
    //         error: {
    //         message: `Request body must contain 'folder_name'`
    //         }
    //     })

    //     FoldersService.updateFolder(
    //     req.app.get('db'),
    //     req.params.folder_id,
    //     folderToUpdate
    //     )
    //     .then(numRowsAffected => {
    //         res.status(204).end()
    //     })
    //     .catch(next)
    // })

module.exports = gearRouter