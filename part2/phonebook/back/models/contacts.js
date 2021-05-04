const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connected to:', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error conecting to MongoDB:', error.message)
	})

const contactsSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})

contactsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactsSchema)

/*const contacts = new Contacts({
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
*/

