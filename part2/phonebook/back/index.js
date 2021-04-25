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

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

