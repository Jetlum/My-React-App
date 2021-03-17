import React, { useState } from 'react'

const Title 		=	props => <h1>{props.title}</h1>
const Statistics 	=	props => <h1>{props.stats}</h1>

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const Good = ({text, good}) => {
	return (
		<p> {text} {good} </p>
	)
}
const Neutral = ({text, neutral}) => {
	return (
		<p> {text} {neutral} </p>
	)
}
const Bad = ({text, bad}) => {
	return (
		<p> {text} {bad} </p>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const title = 'give feedback'
	const stats = 'statistics'
	const [ good, setGood ]				=	useState(0)
	const [ neutral, setNeutral ]		=	useState(0)
	const [ bad, setBad ]				=	useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
	}
	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
	}
	const handleBadClick = () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<Title title={title} />
			<Button handleClick={handleGoodClick}		text='good' 	/>
			<Button handleClick={handleNeutralClick}	text='neutral'	/>
			<Button handleClick={handleBadClick} 		text='bad'		/>
			<Statistics stats={stats} />
			<Good text='good' good={good} />
			<Neutral text='neutral' neutral={neutral} />
			<Bad text='bad' bad={bad} />
		</div>
	)
}

export default App