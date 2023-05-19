import React from "react";
import Part from "./Part";

const Content = ({ parts }) =>
{
    return (
        <div>
            {parts.map(parts => <Part key={parts.id} part={parts} />)}
            {/* <Part part={parts[0]} />
            <Part part={parts[1]}  />
            <Part part={parts[2]}  />
            <Part part={parts[3]}  /> */}
        </div>
    )
}

export default Content;