import React from 'react'

const Course = ({ course }) => {
  return (
    <>
    	<Header name={course.name} />
    	<Content parts={course.parts} />
    	<Total total={course.parts} />
    </>
  )
}
const Header = ({ name }) => {
    return (
        <>
           <h2>{name}</h2>
        </>
    )
}
const Content = ({ parts }) => {
    return (
        <>  
            {parts.map(part =>
                <Part key={part.id} part={part} name={part.name} exercises={part.exercises} />
            )}
        </>
    )
}
const Part = ({ part, name, exercises}) => {
    return (
        <>
            <p> {name} {exercises} </p>
        </>
    )
}
const Total = ({ total }) => {
  const totalExercises = total.reduce((sum, total) => sum + total.exercises, 0);
  return (
    <>
      <b>Total of {totalExercises} exercises</b>
    </>
  );
};

export default Course