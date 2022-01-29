// this is a new version of a phonebook app - connected to mongoDB instead of using a local DB
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)

// info page
app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
            const content = `Phonebook has ${persons.length} contacts </br></br> ${new Date()}`
            res.send(content)
        })
})

// GET ALL
app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons.map(per => per.toJSON()))
        })
})

// GET with an ID
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            if(result){
                res.json(result.toJSON())
            } else {
                res.status(400).end()
            }
        })
        .catch(error => next(error))
})

// POST
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if((body.name === undefined) || (body.number === undefined)){
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date()
    })

    person.save()
        .then(savedPerson => {
            console.log('contacat created!')
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPhonebook => {
            res.json(updatedPhonebook)
        })
        .catch(error => next(error))
})


const errorHandle = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return res.status(400).send({ error: error.message })
    } else if(error.message === 404){
        res.status(404).send({ error: 'unknown endpoint 4004' })
    }

    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint / the url does not exist :|' })
}
app.use(unknownEndpoint)
app.use(errorHandle)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})