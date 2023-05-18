import React from "react";

const StatisticsLine = (props) =>
{
    const { text, value } = props;
    return (
        <tbody>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
        </tbody>
    )
}

export default StatisticsLine;