const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Axror",
        number: "444",
        id: 1
    },
    {
        name: "Aziko",
        number: "5555555555555",
        id: 2
    },
    {
        name: "Tilla",
        number: "9028838883",
        id: 3
    },
    {
        name: "salom",
        number: "999",
        id: 4
    },
    {
        name: "Ena",
        number: "111111111",
        id: 5
    },
    {
        name: "ona",
        number: "91234399",
        id: 6
    },
    {
        name: "jonim",
        number: "1111111111111111",
        id: 7
    },
    {
        name: "dad",
        number: "123456789",
        id: 8
    }
]

const generateid = () => {
    const maxid = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return maxid + 1
}

app.get('/', (req, res) => {
    res.send('home page for persons madafaka')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`phone book has ${persons.length} contacts </br></br> ${Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(400).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const doesexist = persons.filter(person => person.name === body.name)
    if(!body.name || !body.number){
        return res.status(400).json({error: 'content missing'})
    } else if(doesexist.length > 0){
        return res.status(400).json({error: 'name alreay exists'})
    }

    const newobject = {
        name: body.name,
        number: body.number,
        id: generateid(),
        date: new Date()
    }
    persons = persons.concat(newobject)
    res.json(newobject)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})