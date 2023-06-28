import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    message: ""
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action)
        {
            console.log("ACTION: ", action)

            state.message = action.payload
        },
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer