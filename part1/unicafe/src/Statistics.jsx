import React from "react";

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
                    <p>good {good}</p>
                    <p>neutral {neutral}</p>
                    <p>bad {bad}</p>
                    <p>all {all}</p>
                    <p>average {average}</p>
                    <p>positive {positive}%</p>
                </div>
            }
        </div>
    )
}

export default Statistics;