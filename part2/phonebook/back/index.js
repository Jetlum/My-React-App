require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contacts')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const customLogger = morgan((tokens, req, res) => {
    const tinyLog = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms'
    ].join(' ')

    return req.method === 'POST' ? `${tinyLog} ${JSON.stringify(req.body)}` : tinyLog
})


app.use(customLogger)

const NAME_MISSING = { error: 'name missing' }
const NUMBER_MISSING = { error: 'number missing' }
const CONTACT_NOT_FOUND = { error: 'contact not found' }

// An event handler that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
    response.send('Hello World!')
})
// /info writes some info
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${contacts.length} people<br> ${new Date()}</p>`)
})
// Get route fetches all resourses
app.get('/api/contacts', (request, response, next) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
        .catch(error => next(error))
})
// Get route using the id of contact fetches a single resourse
app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id).then(contact => {
        if (contact) {
            response.json(contact.toJSON())
    	} else {
      		next(CONTACT_NOT_FOUND)
    	}
    })
        .catch(error => next(error))
})
// generateId() generates a new id, taking the name parameter and adding contacts.length + 1
// i.e. if contacts length is 3 will create: jetlum-4
/*const generateId = (name) => {
  	const maxId = contacts.length > 0
    ? name + '-' + (contacts.length + 1)
    : 0
  return maxId
}*/

// Post route for adding new entries
app.post('/api/contacts', (request, response, next) => {
    const body = request.body
    if(!body.name) {
        next(NAME_MISSING)
    } else if (!body.number) {
        next(NUMBER_MISSING)
    } else {
        const contact = new Contact({
            name: body.name,
            number: body.number,
            date: new Date(),
            important: body.important || false,
        })
        // Check if the name already exists
        //const contactExists = contact => contacts.some(c => c.name === contact.name)
        // Add an error message if the name already exists
        /*if(!contactExists) {
			return response.status(400).json({
				error: 'Name must be unique'
			})
		}*/
        contact
            .save()
            .then(savedContact => savedContact.toJSON())
            .then(savedAndFormattedContact => {
                response.json(savedAndFormattedContact)
	  		})
            .catch(error => next(error))
    }
})
// Delete route for deleting resources
app.delete('/api/contacts/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
 		.catch(error => next(error))
})
app.put('/api/contacts/:id', (request, response, next) => {
    const body = request.body

    if(!body.name) {
        next(NAME_MISSING)
    } else if (!body.number) {
        next(NUMBER_MISSING)
    } else {
        const contact = {
            name: body.name,
            number: body.number
        }
        Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    		.then(updatedContact => {
      			response.json(updatedContact)
    		})
    		.catch(error => next(error))
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send(
        {
            error: 'Unknwon Endpoint'
        }
    )
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    const { message, name, kind } = error
  	console.error(message)
    if (name === 'CastError' && kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
  	} else if (error === NAME_MISSING || error === NUMBER_MISSING) {
    		return res.status(400).json(error)
  	} else if (error.name === 'ValidationError') {
    		return res.status(400).json({ error: error.message })
  	} else if (error === CONTACT_NOT_FOUND) {
    		return res.status(404).end()
  	} else next(error)
}
app.use(errorHandler)

// Listen to HTTP requests sent to the port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

