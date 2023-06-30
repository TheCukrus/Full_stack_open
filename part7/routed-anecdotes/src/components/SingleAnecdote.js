import React from "react";

const SingleAnecdote = ({ anecdote }) =>
{
    return (
        <div>
            <h1>{anecdote.content} by {anecdote.author}</h1>
            <p>has {anecdote.votes} votes</p>
        </div>
    )
}

export default SingleAnecdote