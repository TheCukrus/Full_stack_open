import { useState } from 'react'

const App = () =>
{
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(8)).map(Number.prototype.valueOf, 0))

  //find value with the most votes
  const maxVotes = Math.max(...points);

  //find index
  const indexOfMaxVotes = (ele) => ele === maxVotes;
  const index = points.findIndex(indexOfMaxVotes);

  const handle_click = (arr) =>
  {
    const random = Math.round(Math.random() * arr);
    return setSelected(random);
  }

  const handle_vote = (num, arr, stateChange) =>
  {
    const copyPoints = [...arr];
    copyPoints[num] += 1;
    return stateChange(copyPoints);
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {/* content */}
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
      </div>

      {/* buttons */}
      <div>
        <input type="button" value="vote" onClick={() => (handle_vote(selected, points, setPoints))} />
        <input type="button" value="next anecdote" onClick={() => (handle_click(anecdotes.length - 1))} />
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[index]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    </>
  )
}

export default App