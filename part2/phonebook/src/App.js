import React, { useState } from 'react'
import Contacts from './components/Contacts'

const App = (props) => {
  	const [persons, setPersons] = useState(props.contacts) 
  	const [newName, setNewName] = useState('')
  	
  	const addContact = (event) => {
  		event.preventDefault()
  		const person = {
  			name: newName,
  			date: new Date().toISOString(),
  			important: Math.random() < 0.5,
  			id: newName + '-' + (persons.length + 1)
  		}
  		const contactExists = person => persons.some(p => p.name === person.name)

  		if (contactExists(person)) {
  			window.alert(`${person.name} is already added to phonebook`)
  			setNewName('')
  		} else {
  			setPersons(persons.concat(person))
  			setNewName('')
  		}

  	}
  	const handleNameChange = event => setNewName(event.target.value)
  	
	return (
		<div>
	    	<h2>Phonebook</h2>
	      	<form onSubmit={addContact}>
	        	<div>
	          		Write your name: <input value={newName} onChange={handleNameChange} />
	        	</div>
	        	<div>
	          		<button id="add-contact-button" type="submit">Add Contact</button>
	        	</div>
	      	</form>
	      	<h2>Contacts</h2>
	  		<ul>
		        {persons.map(person => 
		          <Contacts key={person.id} person={person} />
		        )}
	    	</ul>
		</div>
	)
}

export default App