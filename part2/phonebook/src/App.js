	import React, { useState, useEffect } from 'react'
	import Contacts from './components/Contacts'
	import Filter from './components/Filter'
	import ContactsForm from './components/ContactsForm'
	import contactsService from './services/contacts'

	const App = () => {
	  	const [persons, setPersons] = useState([]) 
	  	const [newName, setNewName] = useState('')
	  	const [newNumber, setNewNumber]	= useState('')
	  	const [filter, setFilter] =	useState('')

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
			 	window.alert(`${person.name} is already added to phonebook`)
				setNewName('')
				setNewNumber('')
			} else {
				contactsService
				.create(person)
				.then(returnedContacts => {
					setPersons(persons.concat(returnedContacts))
					setNewName('')
					setNewNumber('')
				})
				setNewName('')
				setNewNumber('')
			}

		}

		const removeContact = (id, name) => () => {
			if (window.confirm(`Delete ${name}?`)) {
				contactsService
					.deleteFunction(id)
					.then(returnedContacts => {
						setPersons(persons.filter(p => p.id !== id))
					})
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
		    	<h2>Phonebook</h2>
		    	<Filter value={filter} onChange={handleFilterChange} />
		    	<h2>Add a new contact</h2>
		      	<ContactsForm 
		      		onNameChange={handleNameChange} 
		      		nameValue={newName} 
		      		onNumberChange={handleNumberChange}
		      		numberValue={newNumber}
		      		onSubmit={addContact}
		      	/>
		      	<h2>Contacts</h2>
		      	<Contacts persons={filteredPersons} removeContact={removeContact} />
			</div>
		)
	}

	export default App