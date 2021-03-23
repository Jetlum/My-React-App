import React from 'react'

const Header = ({text}) => {
    return (
        <>
           <h1>{text}</h1>
        </>
    )
}
const Course = ({ courses }) => {
    
  return (
    <>
        {courses.map(course =>
            <Content key={course.id} course={course} name={course.name} />
        )}
    </>
  )
}
const Content = ({course, name}) => {
    return (
        <>  
            <h2>{name}</h2>
            {course.parts.map(course =>
                <Part key={course.id} course={course} name={course.name} exercises={course.exercises} />
            )}
            <Total parts={course.parts} />
        </>
    )
}
const Part = ({course, name, exercises}) => {
    return (
        <>
            <p> {name} {exercises} </p>
        </>
    )
}
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <b>Total of {total} exercises</b>
    </>
  );
};

const App = () => {
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


    return (
        <div>
            <Header text='Web Development Curriculum' />
            <Course courses={courses} />
        </div>
    )
}

export default App