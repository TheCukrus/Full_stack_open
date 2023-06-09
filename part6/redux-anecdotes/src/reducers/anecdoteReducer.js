import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes.js"
import { callNotification } from "./notificationReducer.js"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setVote(state, action)
    {
      console.log('state now: ', state)
      console.log('action', action)

      const id = action.payload
      const newState = state.map((ele) =>
      {
        if (ele.id === id)
        {
          return {
            ...ele,
            votes: ele.votes + 1,
          };
        }
        return ele;
      })
      return newState
    },
    setAdd(state, action)
    {
      return [...state, action.payload]
    },
    setAnecdotes(state, action)
    {
      console.log(JSON.parse(JSON.stringify(state)))
      return [...action.payload]
    }
  }
})

export const initializeAnecdotes = () =>
{
  return async dispatch =>
  {
    const anecdote = await anecdoteService.getAll()
    dispatch({ type: "anecdotes/setAnecdotes", payload: anecdote })
  }
}

export const createAnecdote = (content) =>
{
  return async dispatch =>
  {
    const anecdote = await anecdoteService.create(content)
    dispatch({ type: "anecdotes/setAdd", payload: anecdote })
    dispatch(callNotification(`New anecdote ${anecdote.content}`, 10))
  }
}

export const anecdoteVote = (content) =>
{
  return async dispatch =>
  {
    await anecdoteService.update(content)
    dispatch({ type: "anecdotes/setVote", payload: content.id })
    dispatch(callNotification(`You voted ${content.content}`, 10))
  }
}

export const { setVote, setAdd, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
