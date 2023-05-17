import React from "react";

const StatisticsLine = (props) =>
{
    const { text, value } = props;
    return (
        <>
            <p>{text} {value}</p>
        </>
    )
}

export default StatisticsLine;