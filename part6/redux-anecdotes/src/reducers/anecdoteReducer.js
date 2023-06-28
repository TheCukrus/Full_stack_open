import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) =>
{
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      const newAnecdote = asObject(action.payload)
      return state.concat(newAnecdote)
    },
    setAnecdotes(state, action)
    {
      console.log(JSON.parse(JSON.stringify(state)))
      return action.payload
    }
  }
})

export const { setVote, setAdd, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
