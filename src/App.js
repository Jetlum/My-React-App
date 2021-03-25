import React from 'react'
import Course from './components/Course'

const Header = ({ text }) => {
    return (
        <>
           <h1>{text}</h1>
        </>
    )
}

const App = ({ courses }) => {
    return (
        <div>
            <Header text='Web Development Curriculum' />
            {courses.map(course => 
                <Course key={course.id} course={course} />
            )}
        </div>
    )
}

export default App