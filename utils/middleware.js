const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('---')
    next()
}

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

module.exports = {
    requestLogger,
    errorHandle,
    unknownEndpoint
}