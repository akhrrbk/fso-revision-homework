const mongoose = require('mongoose')

const url = process.env.haha
// const url = 'mongodb+srv://jalap:befwejrgfwejrgbwejrg@cluster0.jn9rt.mongodb.net/phonebook?retryWrites=true&w=majority'

console.log(`connecting to ${url}`);
mongoose.connect(url)
    .then(res => {
        console.log(`connected to mongoDB`);
    })
    .catch((error) => {
        console.log(`cannot connect to MongoDB: ${error.message}`);
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