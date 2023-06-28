import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    filter: "FILTER",
    text: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter(state, action)
        {
            console.log("ACTION: ", action)
            console.log("STATE: ", state)

            state.filter = action.payload
        },
        setText(state, action)
        {
            console.log("ACTION: ", action)
            console.log(JSON.parse(JSON.stringify(state)))

            state.text = action.payload
        }
    }
})

export const { setFilter, setText } = filterSlice.actions
export default filterSlice.reducer