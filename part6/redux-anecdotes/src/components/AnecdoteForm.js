import React from "react"
import { useDispatch } from "react-redux"

const AnecdoteForm = () =>
{
    const dispatch = useDispatch()

    const addAnecdote = (e) =>
    {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        dispatch({ type: "anecdotes/setAdd", payload: content })
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