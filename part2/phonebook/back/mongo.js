const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password  = process.argv[2]
const name      =	process.argv[3]
const number    = process.argv[4]

const url = `mongodb+srv://lumi_mongo:${password}@cluster0.qj9to.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactsSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})

const Contacts = mongoose.model('Contacts', contactsSchema)

const contacts = new Contacts({
  name: name,
  number: number,
  date: new Date(),
  important: true,
})

if(!name && !number) {
	Contacts.find({}).then(result => {
		console.log('Phonebook:')
  		result.forEach(contacts => {
    		console.log(contacts)
    		mongoose.connection.close()
		}) 
	}) 
} else {
 	contacts.save({name: name, number: number}).then(result => {
  		console.log('Added:', name, "number:", number, "to phonebook")
  		mongoose.connection.close()
	})
}


