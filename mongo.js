const mongoose = require('mongoose')

// error
if(process.argv.length < 3){
    console.log('provide the password in this order node mongo.js <password>');
}

// retreiving data from database
const pass = process.argv[2]
const url = `mongodb+srv://jalap:${pass}@cluster0.jn9rt.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

// creating a Schema - shape of data
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})
//creating a model - to put schema into
const Person = mongoose.model('Person', personSchema)

// conditions
if(process.argv.length === 3){
    console.log('Phonebook:');
    Person.find().then(res => {
        res.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })
} else if(process.argv.length === 4){
    console.log('some content is missing');
    mongoose.connection.close()
} else if(process.argv.length === 5){
    const nameinput = process.argv[3]
    const numberinput = process.argv[4]

    const person = new Person({
        name: nameinput,
        number: numberinput,
        date: new Date()
    })

    person.save().then(res => {
        console.log('contact saved!');
        mongoose.connection.close()
    })
}


