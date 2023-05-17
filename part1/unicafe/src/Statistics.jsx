import React from "react";
import StatisticsLine from "./StatisticLine.jsx";

const Statistics = (props) =>
{
    const { good, neutral, bad } = props;

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = good / all * 100;

    return (
        <div>
            {all === 0 ?
                <p>No feedback given</p> :
                <div>
                    <h1>statistics</h1>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    <StatisticsLine text="all" value={all} />
                    <StatisticsLine text="average" value={average} />
                    <StatisticsLine text="positive" value={positive} />
                </div>
            }
        </div>
    )
}

export default Statistics;