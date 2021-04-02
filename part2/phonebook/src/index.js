import ReactDOM from 'react-dom'
import App from './App'

const contacts = [
	{
		name: 'Arto Hellas',
		number: '044 444 444',
   		important: Math.random() < 0.5,
  		id: 'ArtoHellas-1'
	}
]

ReactDOM.render(<App contacts={contacts} />, document.getElementById('root'))