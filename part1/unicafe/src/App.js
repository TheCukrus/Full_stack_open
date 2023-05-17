import { useState } from 'react'

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all * 100;
  
  return (
    <div>
      <h1>give feedback</h1>
      <input type="button" value="good" onClick={() => setGood(good + 1)} />
      <input type="button" value="neutral" onClick={() => setNeutral(neutral + 1)} />
      <input type="button" value="bad" onClick={() => setBad(bad + 1)} />

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App