const path = require('path')
const express = require('express')
const xss = require('xss')
const ListsService = require('./lists-service')
const LookupService = require('./lookup-service')

const listRouter = express.Router()
const jsonParser = express.json()



listRouter
  .route('/user/:user_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
      ListsService.getListsWithGear(knexInstance, req.params.user_id)
      .then(lists => {
           const grouped = ListsService.groupLists(lists)
 
        res.json(grouped)  
}
      )
      .catch(next)
  })
  
listRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { list_name, list_description, user_id, gear } = req.body
    const newList = { list_name, list_description, user_id }

    for (const [key, value] of Object.entries(newList)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    ListsService.addNewList(
      req.app.get('db'),
      newList
    )
        .then(list => LookupService.addNewLookup(req.app.get('db'), gear, list))
      .then(list => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${list.id}`))
          .json(list)
      })
      .catch(next)
  })

listRouter
  .route('/:list_id')
  .all((req, res, next) => {
    ListsService.getById(
      req.app.get('db'),
      req.params.list_id
    )
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `List doesn't exist` }
          })
        }
        res.list = list
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
      res.json(res.list)
    // res.json(serializeFolder(res.list))
  })
  .delete((req, res, next) => {
    ListsService.deleteList(
      req.app.get('db'),
      req.params.list_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { list_name, list_description, user_id, gear} = req.body
    const reqFields = { list_name, list_description, user_id, gear }
    const listToUpdate = {list_name, list_description, user_id}

    // const numberOfValues = Object.values(reqFields).filter(Boolean).length
    // if (numberOfValues === 0)
    //   return res.status(400).json({
    //     error: {
    //       message: `Request body must contain 'list_name', 'description', or 'gear`
    //     }
    //   })

    if (gear) {
      console.log("Here")
      LookupService.updateListLookup(
        req.app.get('db'),
        req.params.list_id,
        gear
      )
    }

    ListsService.updateList(
      req.app.get('db'),
      req.params.list_id,
      listToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = listRouter