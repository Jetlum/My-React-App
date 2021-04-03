import React from 'react'

const Contacts = ({ persons }) => {
	return (
		<ul>
			{persons.map(person => 
			 	<li key={person.id}>{person.name} {person.number}</li>
			)}
		</ul>
	)
}

export default Contacts