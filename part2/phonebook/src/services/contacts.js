import axios from 'axios'
const baseURL = 'http://localhost:3001/contacts'

const getAll = () => {
	const request = axios.get(baseURL)
	return request.then(response => response.data)
}

const create = person => {
	const request = axios.post(baseURL, person)
	return request.then(response => response.data)
}

const update = (id, person) => {
	const request = axios.put(`${baseURL}/${id}`, person)
	return request.then(response => response.data)
}

const contactsServiceFunctions = { getAll, create, update }

export default contactsServiceFunctions