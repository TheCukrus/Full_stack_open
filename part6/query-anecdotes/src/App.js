import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, updateVote } from "./request.js"
import { useContext } from 'react'

const App = () =>
{
  const queryClient = useQueryClient()
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(updateVote, {
    onSuccess: () =>
    {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const handleVote = (anecdote) =>
  {
    newAnecdoteMutation.mutate(anecdote)
    notificationDispatch({ type: "VOTE", payload: anecdote.content })
  }

  const result = useQuery("anecdotes", getAll,
    {
      retry: false
    })

  console.log(result)


  if (result.isLoading)
  {
    return (
      <div>
        Loading data...
      </div>
    )
  }

  if (result.isError)
  {
    return (
      <div>
        Anecdote service not available due to problems in server
      </div>
    )
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
