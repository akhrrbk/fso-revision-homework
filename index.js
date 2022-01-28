require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// // old data
// let persons = [
//     {
//         name: "Axror",
//         number: "444",
//         id: 1
//     },
//     {
//         name: "Aziko",
//         number: "5555555555555",
//         id: 2
//     },
//     {
//         name: "Tilla",
//         number: "9028838883",
//         id: 3
//     },
//     {
//         name: "salom",
//         number: "999",
//         id: 4
//     },
//     {
//         name: "Ena",
//         number: "111111111",
//         id: 5
//     },
//     {
//         name: "ona",
//         number: "91234399",
//         id: 6
//     },
//     {
//         name: "jonim",
//         number: "1111111111111111",
//         id: 7
//     },
//     {
//         name: "dad",
//         number: "123456789",
//         id: 8
//     }
// ]

// const generateid = () => {
//     const maxid = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
//     return maxid + 1
// }

// app.get('/', (req, res) => {
//     res.send('home page for persons madafaka')
// })


// uses mongoose
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

// app.get('/info', (req, res) => {
//     res.send(`phone book has ${persons.length} contacts </br></br> ${Date()}`)
// })

// old code to get a contact with an id
// app.get('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const person = persons.find(person => person.id === id)
//     if(person){
//         res.json(person)
//     } else {
//         res.status(400).end()
//     }
// })

// new code to get a contact with an id
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
})

// old code to delete a contact with an id
// app.delete('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     persons = persons.filter(person => person.id !== id)
//     res.status(204).end()
// })

// new code to delete a contact with an id
// ...


app.post('/api/persons', (req, res) => {
    const body = req.body

    if((body.name === undefined) || (body.number === undefined)){
        return res.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date()
    })
    
    person.save().then(result => {
        console.log('contacat created!');
        res.json(result)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})