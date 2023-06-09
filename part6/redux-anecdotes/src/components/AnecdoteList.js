import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { anecdoteVote } from "../reducers/anecdoteReducer.js"

const AnecdoteList = () =>
{

    const anecdotes = useSelector(state => state.anecdotes)

    const filter = useSelector(state => state.filter)

    const dispatch = useDispatch()

    const votes = async (content) =>
    {
        dispatch(anecdoteVote(content))
    }

    const filteredAnecdotes = anecdotes.filter((ele) =>
    {
        if (filter.text)
        {
            return ele.content.toLowerCase().includes(filter.text.toLowerCase())
        }
        return ele
    })

    return (
        <>
            {filteredAnecdotes
                .sort((a, b) => a.votes - b.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => votes(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default AnecdoteList