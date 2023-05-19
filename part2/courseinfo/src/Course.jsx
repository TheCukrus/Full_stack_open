import React from "react";
import Content from "./Content.jsx";
import Header from "./Header.jsx";
import Total from "./Total.jsx";

const Course = ({ courses }) =>
{
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) =>
            (
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>

            ))}
        </div>
    )
}

export default Course;