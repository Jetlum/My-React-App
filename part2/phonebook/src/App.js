import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactsForm from './components/ContactsForm'
import Notification from './components/Notification'
import contactsService from './services/contacts'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber]	= useState('')
	const [filter, setFilter] =	useState('')
	const [errorMessage, setErrorMessage] = useState()

	useEffect(() => {
    	contactsService
      		.getAll()
      		.then(initialContacts => {
        		setPersons(initialContacts)
      		})
  	}, [])

	  const addContact = (event) => {
	  	event.preventDefault()
	  	const person = {
	  		name: newName,
	  		number: newNumber,
	  		date: new Date().toISOString(),
	  		important: Math.random() < 0.5,
	  		id: newName + '-' + (persons.length + 1)
		}
		const contactExists = person => persons.some(p => p.name === person.name)

		if (contactExists(person)) {
			if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
				const personCreated = persons.find(p => p.name === person.name)
				const changedContact = { ...personCreated, id: personCreated.id, number: person.number }
				contactsService
					.update(personCreated.id, changedContact)
			      	.then(returnedContacts => {
			        	setPersons(persons.map(p => p.id !== personCreated.id ? p  : returnedContacts))
    					setErrorMessage(
				          `Number of the contact: '${person.name}' was updated to '${person.number}'`
				        )
				        setTimeout(() => {
				          setErrorMessage(null)
				        }, 5000)

			      	})
			      	.catch(error => {
				        setErrorMessage(
				          `Contact '${person.name} ${person.number}' was already removed from server`
				        )
				        setTimeout(() => {
				          setErrorMessage(null)
				        }, 5000)
			        	setPersons(persons.filter(p => p.id !== person.id))
			      	})
			      	setNewName('')
					setNewNumber('')
			}
		} else {
			contactsService
			.create(person)
			.then(returnedContacts => {
				setPersons(persons.concat(returnedContacts))
				setNewName('')
				setNewNumber('')
				setErrorMessage(
					`Added '${person.name} ${person.number}'`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
		}

	}

	const removeContact = (id, name) => () => {
		if (window.confirm(`Delete ${name}?`)) {
			contactsService
				.deleteFunction(id)
				.then(returnedContacts => {
					setPersons(persons.filter(p => p.id !== id))
				})
				setErrorMessage(
					`Deleted '${name}'`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
		}
	}
	  const handleNameChange = event => setNewName(event.target.value)
	  const handleNumberChange = event => setNewNumber(event.target.value)
	  const handleFilterChange = event => setFilter(event.target.value)

	  // .includes can be replaced with .startsWith which determines whether a string begins 
	  // with the characters of a specified string, more appropriate for this kind of filter
	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

	return (
		<div>
		    <h1>Phonebook</h1>
		    {errorMessage && <Notification message={errorMessage} />}
		    <Filter value={filter} onChange={handleFilterChange} />
		    <h1>Add a new contact</h1>
		      <ContactsForm 
		      	onNameChange={handleNameChange} 
		      	nameValue={newName} 
		      	onNumberChange={handleNumberChange}
		      	numberValue={newNumber}
		      	onSubmit={addContact}
		      />
		      <h1>Contacts</h1>
		      <Contacts persons={filteredPersons} removeContact={removeContact} />
		</div>
	)
}

export default App