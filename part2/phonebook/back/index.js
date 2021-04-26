const express = require('express')
const app = express()
const http = require('http')

app.use(express.json())

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

app.get('/', (request, response) => {
	response.json(contacts)
})

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${contacts.length} people<br> ${new Date()}</p>`)
})

app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
	const id = request.params.id
	const contact = contacts.find(contact => contact.id === id)

	if(contact) {
		response.json(contact)
	} else {
		response.status(404).end()
	}
})

const generateId = (name) => {
  	const maxId = contacts.length > 0
    ? name + '-' + (contacts.length + 1)
    : 0
  return maxId
}

app.post('/api/contacts', (request, response) => {
	const body = request.body
	if(!body.name && !body.number) {
		return response.status(400).json({
			error: 'Content is missing'
		})
	}
	
	const contact = {
		name: body.name,
		number: body.number,
		date: new Date(),
		important: body.important || false,
		id: generateId(body.name),
	}

	contacts = contacts.concat(contact)

	response.json(contact)
})

app.delete('/api/contacts/:id', (request, response) => {
	const id = request.params.id
	contacts = contacts.filter(contact => contact.id !== id)
	response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

