import { createSlice } from "@reduxjs/toolkit"

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

export const { setVote, setAdd, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
