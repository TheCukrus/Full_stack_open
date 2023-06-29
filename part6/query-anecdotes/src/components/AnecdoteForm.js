import { useMutation, useQueryClient } from "react-query"
import { create } from "../request"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () =>
{
  const queryClient = useQueryClient()
  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(create, {
    onSuccess: () =>
    {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const onCreate = (event) =>
  {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: "ADD", payload: content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
