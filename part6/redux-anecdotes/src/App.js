import { useSelector, useDispatch } from 'react-redux'

const App = () =>
{
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) =>
  {
    console.log('vote', id)
    dispatch({
      type: "VOTE",
      payload: { id }
    })
  }

  const addAnecdote = (e) =>
  {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch({
      type: "ADD",
      payload: { content }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => a.votes - b.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input type="text" name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App