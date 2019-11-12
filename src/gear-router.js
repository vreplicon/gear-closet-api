const path = require('path')
const express = require('express')
const xss = require('xss')
const GearService = require('./gear-service')

const gearRouter = express.Router()
const jsonParser = express.json()

const serializeGear = gear => ({
  id: gear.id,
  user_id : gear.user_id,
  gear_name : xss(gear.gear_name),
  gear_type : gear.gear_type,
  gear_weight : gear.gear_weight,
  weight_unit : gear.weight_unit,
  notes : xss(gear.notes)
})

gearRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    GearService.getAllGear(knexInstance)
      .then(gear => {
        //   res.json(gear)
        res.json(gear.map(serializeGear))
      })
      .catch(next)
  })
    .post(jsonParser, (req, res, next) => {
        const { user_id, gear_name, gear_type, gear_weight, weight_unit, notes } = req.body
        const newGear = { user_id, gear_name, gear_type, gear_weight, weight_unit, notes }
        const requiredFields = {user_id, gear_name, gear_type}

        for (const [key, value] of Object.entries(requiredFields)) {
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
                //   res.json(gear)
                res.json(gear.map(serializeGear))
              })
              .catch(next)
          })

    gearRouter
    .route('/:gear_id')
    .all((req, res, next) => {
        GearService.getById(
        req.app.get('db'),
        req.params.gear_id
        )
        .then(gear => {
            if (!gear) {
            return res.status(404).json({
                error: { message: `Gear doesn't exist` }
            })
            }
            res.gear = gear
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        // res.json(serializeFolder(res.folder))
    })
    .delete((req, res, next) => {
        GearService.deleteGear(
        req.app.get('db'),
        req.params.gear_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {user_id, gear_name, gear_type, gear_weight, weight_unit, notes } = req.body
        const gearToUpdate = { user_id, gear_name, gear_type, gear_weight, weight_unit, notes }

        const numberOfValues = Object.values(gearToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
        return res.status(400).json({
            error: {
            message: `Request body must contain user_id, gear_name, gear_type, gear_weight, weight_unit, or notes`
            }
        })

        GearService.updateGear(
        req.app.get('db'),
        req.params.gear_id,
        gearToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = gearRouter