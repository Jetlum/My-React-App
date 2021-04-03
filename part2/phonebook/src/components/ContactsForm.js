import React from 'react'

const ContactsForm = ({ onNameChange, nameValue, onNumberChange, numberValue, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
		        	<div>
		          		Write your name: <input value={nameValue} onChange={onNameChange} />
		        	</div>
		        	<div>
		          		Write your number: <input value={numberValue} onChange={onNumberChange} />
		        	</div>
		        	<div>
		          		<button type="submit">Add Contact</button>
		        	</div>
		</form>
	)
}

export default ContactsForm