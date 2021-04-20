import React from 'react'

const Contacts = ({ persons, removeContact }) => {

	return (
		<ul>
			{persons.map(person => 
			 	<li key={person.id}>
			 		{person.name} {person.number}
			 		<button onClick={removeContact(person.id, person.name)}>Delete</button>
			 	</li>
			)}
		</ul>
	)
}

export default Contacts