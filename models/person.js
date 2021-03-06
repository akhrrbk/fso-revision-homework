const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url)
    .then(res => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log(`cannot connect to MongoDB: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)