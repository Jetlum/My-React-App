const express = require('express')
const app = express()
const http = require('http')

app.use(express.json())

// Contacts(Resources)
let contacts = [
	{
		"name": "lum",
	  	"number": "65567",
	   	"date": "2021-04-22T00:01:47.407Z",
	   	"important": false,
	  	"id": "lum-3"
	    
	},
	{
		"name": "jetlum",
	  	"number": "65567",
	   	"date": "2021-04-22T00:01:47.407Z",
	   	"important": false,
	  	"id": "jetlum-3"
	    
	},
	{
		"name": "lumi",
	  	"number": "65567",
	   	"date": "2021-04-22T00:01:47.407Z",
	   	"important": false,
	  	"id": "lumi-3"
	    
	},
]
// An event handler, that is used to handle HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
	response.send("Hello World!")
})
// /info writes some info
app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${contacts.length} people<br> ${new Date()}</p>`)
})
// Get route fetches all resourses
app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})
// Get route using the id of contact fetches a single resourse
app.get('/api/contacts/:id', (request, response) => {
	const id = request.params.id
	const contact = contacts.find(contact => contact.id === id)

	if(contact) {
		response.json(contact)
	} else {
		response.status(404).end()
	}
})
// generateId() generates a new id, taking the name parameter and adding contacts.length + 1
// i.e. if contacts length is 3 will create: jetlum-4
const generateId = (name) => {
  	const maxId = contacts.length > 0
    ? name + '-' + (contacts.length + 1)
    : 0
  return maxId
}
// Post route for adding new entries
app.post('/api/contacts', (request, response) => {
	const body = request.body
	if(!body.name && !body.number) {
		return response.status(400).json({
			error: 'Name and number are missing'
		})
	}
	const contact = {
		name: body.name,
		number: body.number,
		date: new Date(),
		important: body.important || false,
		id: generateId(body.name),
	}
	// Check if the name already exists
	const contactExists = contact => contacts.some(c => c.name === contact.name)
	// Add an error message if the name already exists
	if(contactExists) {
		return response.status(400).json({
			error: 'Name must be unique'
		})
	}
	contacts = contacts.concat(contact)
	response.json(contact)
})
// Delete route for deleting resources
app.delete('/api/contacts/:id', (request, response) => {
	const id = request.params.id
	contacts = contacts.filter(contact => contact.id !== id)
	response.status(204).end()
})
// Listen to HTTP requests sent to the port 3001
const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

