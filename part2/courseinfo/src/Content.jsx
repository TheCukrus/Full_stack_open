import React from "react";
import Part from "./Part";

const Content = ({ parts }) =>
{
    return (
        <div>
            {parts.map(parts => <Part key={parts.id} part={parts} />)}
        </div>
    )
}

export default Content;