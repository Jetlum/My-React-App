import React, { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>
const Statistics = ({stats}) => <h1>{stats}</h1>

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
const All = ({text, good, neutral, bad}) => {
	return (
		<p> {text} {good + neutral + bad}</p>
	)
}
const Average = ({text, good, neutral, bad, goodValue, neutralValue, badValue}) => {
	return (
		<p>{text} {(goodValue + neutralValue + badValue) / (good + neutral + bad)}</p>
	)
}
const Positive = ({text, good, neutral, bad}) => {
	return (
		<p> {text} {(good / (good + neutral + bad)) * 100} %</p>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const title = 'give feedback'
	const stats = 'statistics'
	const [ good, setGood ] = useState(0)
	const [ neutral, setNeutral ] =	useState(0)
	const [ bad, setBad ] =	useState(0)
	const [goodValue, setgoodValue] = useState(0)
	const [neutralValue, setneutralValue] = useState(0)
	const [badValue, setbadValue] = useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
		setgoodValue(goodValue + 1)
	}
	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
		setneutralValue(neutralValue * 0)
	}
	const handleBadClick = () => {
		setBad(bad + 1)
		setbadValue((badValue * 0) - 1)
	}

	return (
		<div>
			<Title title={title} />
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
			<Statistics stats={stats} />
			<Good text='good' good={good} />
			<Neutral text='neutral' neutral={neutral} />
			<Bad text='bad' bad={bad} />
			<All text='all' good={good} neutral={neutral} bad={bad} />
			<Average text='average' good={good} neutral={neutral} bad={bad} goodValue={goodValue} neutralValue={neutralValue} badValue={badValue} />
			<Positive text='positive' good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App