import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { vote } from './reducers/anecdoteReducer'

const App = () =>
{
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const votes = (id) =>
  {
    dispatch(vote(id))
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
              <button onClick={() => votes(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      <AnecdoteForm />
    </div>
  )
}

export default App