const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controllers/persons')
const infoRouter = require('./controllers/info')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const mongoose = require('mongoose')


console.log('appJS: connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB', error.message)
    })

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personRouter)
app.use('/', infoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandle)

module.exports = app