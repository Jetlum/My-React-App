import React from 'react'

const Header = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
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
            <Part part={course.part[0].name} exercises={course.part[0].exercises} />
            <Part part={course.part[1].name} exercises={course.part[1].exercises} />
            <Part part={course.part[2].name} exercises={course.part[2].exercises} />
        </>
    )
}
const Total = ({course}) => {
    return (
        <>
            <p>Number of exercises {course.part[0].exercises+course.part[1].exercises+course.part[2].exercises}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        part: [
            {
            name: 'Fundamentals of React',
            exercises: 10
            },
            {
            name: 'Using props to pass data',
            exercises: 7
            },
            {
            name: 'State of a component',
            exercises: 14
            }
       ]
    }
    return (
        <div>
           <Header  course={course} />
           <Content course={course} />
           <Total   course={course} />
        </div>
    )
}

export default App