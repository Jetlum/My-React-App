import React, { useState } from 'react'

const Header = ({text}) => ( 
	<>
		<h1>{text}</h1>
	</>
)

const Button = ({handleClick, text}) => {
	return (
		<>
			<button onClick={handleClick}> {text} </button>
		</>
	)
}
const Anecdote = ({anecdote, votes}) => (
	<>
		<p>{anecdote}</p>
		<p>Has {votes} votes</p>
	</>
)


const App = () => {
	const anecdotes = [
	    'If it hurts, do it more often',
	    'Adding manpower to a late software project makes it later!',
	    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	    'Premature optimization is the root of all evil.',
	    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  	]
  const initialVotes = Array(anecdotes.length).fill(0)
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVote ] = useState(initialVotes)

  const showAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteAnecdote = () => {
  	const copy = [...votes]
  	copy[selected] += 1
  	setVote(copy)
  }

  const maxVotes = Math.max(...votes)
  const mostVotedAnecdote = anecdotes[votes.indexOf(maxVotes)];
  return (
  	<div>
  		<Header text='Anecdote of the day' />
  		<Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
  		<Button handleClick={voteAnecdote} text='Vote' />
  		<Button handleClick={showAnecdote} text='Next Anecdote' />

  		<Header text='Anecdote with the most votes' />
  		<Anecdote anecdote={mostVotedAnecdote} votes={maxVotes} />
  	</div>
  )

}

export default App