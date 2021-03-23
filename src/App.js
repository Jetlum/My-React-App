import React from 'react'

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course} />
    </div>
  )
}
const Header = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
            <Content course={course.parts} />
        </>
    )
}
const Part = ({part, exercises}) => {
    return (
        <>
            <p> {part} {exercises} </p>
        </>
    )
}
const Content = ({course}) => {
    return (
        <>
            <Part part={course[0].name} exercises={course[0].exercises} />
            <Part part={course[1].name} exercises={course[1].exercises} />
            <Part part={course[2].name} exercises={course[2].exercises} />
        </>
    )
}
const Total = ({course}) => {
    return (
        <>
            <p>Number of exercises {course[0].exercises+course[1].exercises+course[2].exercises}</p>
        </>
    )
}

const App = () => {
    const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
    return <Course course={course} />
}

export default App