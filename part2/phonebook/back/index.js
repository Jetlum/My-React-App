require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contacts')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const customLogger = morgan((tokens, req, res) => {
  const tinyLog = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');

  return req.method === 'POST' ? `${tinyLog} ${JSON.stringify(req.body)}` : tinyLog;
});

app.use(bodyParser.json());
app.use(customLogger);

// An event handler that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
	response.send("Hello World!")
})
// /info writes some info
app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${contacts.length} people<br> ${new Date()}</p>`)
})
// Get route fetches all resourses
app.get('/api/contacts', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})
// Get route using the id of contact fetches a single resourse
app.get('/api/contacts/:id', (request, response) => {
	Contact.findById(request.params.id).then(contact => {
		if (contact) {
      		response.json(contact.toJSON());
    	} else {
      		response.status(404).end();
    	}
	})
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
app.post('/api/contacts', (request, response) => {
	const body = request.body
	if(!body.name && !body.number) {
		return response.status(400).json({
			error: 'Name and number are missing'
		})
	}
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
	contact.save().then(savedContact => {
    	response.json(savedContact.toJSON())
  	})
})
// Delete route for deleting resources
app.delete('/api/contacts/:id', (request, response) => {
	Contact.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send(
    {
      error: 'Unknwon Endpoint'
    }
  )
}

app.use(unknownEndpoint)

// Listen to HTTP requests sent to the port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

