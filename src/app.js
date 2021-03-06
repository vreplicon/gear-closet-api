require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV
} = require('./config')
const listRouter = require('./list-router')
const lookupRouter = require('./lookup-router')
const gearRouter = require('./gear-router')
const usersRouter = require('./users-router')
// const authRouter = require('./auth-router')
const {
    CLIENT_ORIGIN
} = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'common';

app.use(morgan(morganOption))
app.use(helmet())
// app.use(cors())


app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)

// app.use(cors)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/api/lists', listRouter)
app.use('/api/lookup', lookupRouter)
app.use('/api/gear', gearRouter)
app.use('/api/users', usersRouter)
// app.use('/api/auth', authRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = {
            error: {
                message: 'server error'
            }
        }
    } else {
        console.error(error)
        response = {
            message: error.message,
            error
        }
    }
    res.status(500).json(response)
})

module.exports = app