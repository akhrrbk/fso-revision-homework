const personRouter = require('express').Router()
const Person = require('../models/person')

// GET ALL
personRouter.get('/', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons.map(per => per.toJSON()))
        })
})

// GET with an ID
personRouter.get('/:id', (req, res, next) => {
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
personRouter.post('/', (req, res, next) => {
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
personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// PUT
personRouter.put('/:id', (req, res, next) => {
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

module.exports = personRouter