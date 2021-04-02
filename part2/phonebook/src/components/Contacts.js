import React from 'react'

const Contacts = ({ person }) => {
	return (
		<li>{person.name} {person.number}</li>
	)
}

export default Contacts