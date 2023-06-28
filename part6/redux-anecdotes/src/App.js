import AnecdoteForm from "./components/AnecdoteForm.js"
import AnecdoteList from "./components/AnecdoteList.js"
import Filter from "./components/Filter.js"
import Notification from "./components/Notification.js"
import anecdoteService from "./services/anecdotes.js"

import { useEffect } from "react"
import { useDispatch } from "react-redux"

const App = () =>
{

  const dispatch = useDispatch()

  useEffect(() =>
  {
    anecdoteService.getAll()
      .then(anecdotes => dispatch({ type: "anecdotes/setAnecdotes", payload: anecdotes }))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App