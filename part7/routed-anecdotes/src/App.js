import { useState } from "react"
import { Routes, Route, useMatch } from "react-router-dom"

import About from "./components/About.js"
import AnecdoteList from "./components/AnecdoteList.js"
import CreateNew from "./components/CreateNew.js"
import Footer from "./components/Footer"
import Menu from "./components/Meniu.js"
import SingleAnecdote from "./components/SingleAnecdote.js"
import Notification from "./components/Notification.js"

const App = () =>
{
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState("")

  const match = useMatch("/anecdote/:id")
  const anecdote = match
    ? anecdotes.find(ele => ele.id === Number(match.params.id))
    : null

  const addNew = (anecdote) =>
  {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) =>
  {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} setNotification={setNotification} />

      <Routes>
        <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdote/:id" element={<SingleAnecdote anecdote={anecdote} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
