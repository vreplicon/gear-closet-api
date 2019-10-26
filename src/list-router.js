const path = require('path')
const express = require('express')
const xss = require('xss')
const ListsService = require('./gear-service')

const listRouter = express.Router()
const jsonParser = express.json()

// const serializeFolder = folder => ({
//   id: folder.id,
//   folder_name : xss(folder.folder_name)
// })

listRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ListsService.getAllFolders(knexInstance)
      .then(lists => {
          res.json(lists)
        // res.json(folders.map(serializeFolder))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { folder_name } = req.body
    const newFolder = { folder_name }

    for (const [key, value] of Object.entries(newFolder)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    ListsService.insertGear(
      req.app.get('db'),
      newList
    )
      .then(list => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${list.id}`))
          .json(list)
      })
      .catch(next)
  })

foldersRouter
  .route('/:list_id')
  .all((req, res, next) => {
    ListsService.getById(
      req.app.get('db'),
      req.params.list_id
    )
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` }
          })
        }
        res.list = list
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeFolder(res.folder))
  })
  .delete((req, res, next) => {
    FoldersService.deleteFolder(
      req.app.get('db'),
      req.params.folder_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { folder_name} = req.body
    const folderToUpdate = { folder_name }

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain 'folder_name'`
        }
      })

    FoldersService.updateFolder(
      req.app.get('db'),
      req.params.folder_id,
      folderToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = foldersRouter