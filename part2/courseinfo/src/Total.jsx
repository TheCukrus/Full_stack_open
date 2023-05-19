import React from "react";

const Total = ({ parts }) =>
{
    const total = parts.reduce((sum, val) =>  sum + val.exercises, 0)
    return (
        <div>
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Total;