const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(`database has ${persons.length} contacts`)
        })
        .catch(error => {
            console.log(error.message)
        })
})

module.exports = infoRouter