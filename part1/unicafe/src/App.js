import { useState } from 'react';
import Statistics from './Statistics.jsx';

const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <input type="button" value="good" onClick={() => setGood(good + 1)} />
      <input type="button" value="neutral" onClick={() => setNeutral(neutral + 1)} />
      <input type="button" value="bad" onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App