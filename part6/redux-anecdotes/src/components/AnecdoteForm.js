import React from "react"
import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes.js"

const AnecdoteForm = () =>
{
    const dispatch = useDispatch()

    const addAnecdote = async (e) =>
    {
        e.preventDefault()

        const content = {
            content: e.target.anecdote.value,
            votes: 0
        }
        e.target.anecdote.value = ""
        const anecdote = await anecdoteService.create(content)

        dispatch({ type: "anecdotes/setAdd", payload: anecdote })
        dispatch({ type: "notification/setNotification", payload: "New anecdote added" })
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input type="text" name="anecdote" /></div>
                <button type="submit">create</button>
            </form>

        </div>
    )
}
export default AnecdoteForm