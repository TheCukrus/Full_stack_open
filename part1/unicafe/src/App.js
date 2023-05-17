import { useState } from 'react';
import Button from './Button.jsx';
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


      <Button val="good" func={() => setGood(good + 1)} />
      <Button val="neutral" func={() => setNeutral(neutral + 1)} />
      <Button val="bad" func={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App