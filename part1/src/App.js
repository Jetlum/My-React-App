import React, { useState } from 'react'

const Header = ({text}) =>(
		<>
			<h1>{text}</h1>
		</>
	)

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistics = ({ statistics }) => {
	if(statistics.all.value === 0){
		return (
			<>
				No feedback given
			</>
		)
	}
	return (
		<>
  			<Statistic text={statistics.good.text} value={statistics.good.value} />
  			<Statistic text={statistics.neutral.text} value={statistics.neutral.value} />
  			<Statistic text={statistics.bad.text} value={statistics.bad.value} />
  			<Statistic text={statistics.all.text} value={statistics.all.value} />
  			<Statistic text={statistics.average.text} value={statistics.average.value} />
  			<Statistic text={statistics.positive.text} value={statistics.positive.value} />
  		</>
  	)
}

const Statistic = ({text, value}) => {
	return (
	<table>
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr> 
		</tbody>
	</table>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [ good, setGood ] = useState(0)
	const [ neutral, setNeutral ] =	useState(0)
	const [ bad, setBad ] =	useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
	}
	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
	}
	const handleBadClick = () => {
		setBad(bad + 1)
	}
	const all = good + neutral + bad
	const sum = good * 1 + bad * -1
	const average = sum / all || 0
	const positive = `${(good / all) * 100 || 0} %`

	const statistics = {
		good: {text: 'Good', value: good},
		neutral: {text: 'Neutral', value: neutral},
		bad: {text: 'Bad', value: bad},
		all: {text: 'All', value: all},
		average: {text: 'Average', value: average},
		positive: {text: 'Positive', value: positive}
	}


	return (
		<div>
			<Header text='Give Feedback' />
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
			<Header text='Statistics' />
			<Statistics statistics={statistics} />
		</div>
	)
}

export default App