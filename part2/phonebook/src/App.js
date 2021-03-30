import React, { useState } from 'react'
import Contacts from './components/Contacts'

const App = (props) => {
  	const [persons, setPersons] = useState(props.contacts) 
  	const [newName, setNewName] = useState('')

  	const addContact = (event) => {
  		event.preventDefault()
  		const nameObject = {
  			name: newName,
  			date: new Date().toISOString(),
  			important: Math.random() < 0.5,
  			id: newName + '-' + (persons.length + 1)
  		}
  		setPersons(persons.concat(nameObject))
  		setNewName('')

  	}
  	const handleNameChange = (event) => {
  		setNewName(event.target.value)
  	}
  	const found = persons.find( ({ name }) => name === newName );
  	const noDuplicateContact = found ? alert(`${newName} is already added to phonebook`) : persons
  	
	  return (
	    <div>
	      <h2>Phonebook</h2>
	      <form onSubmit={addContact}>
	        <div>
	          Write your name: <input value={newName} onChange={handleNameChange} />
	        </div>
	        <div>
	          <button type="submit">Add Contact</button>
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