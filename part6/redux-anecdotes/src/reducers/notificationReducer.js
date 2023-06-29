import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    message: null
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
        setRemoveMessage(state, action)
        {
            console.log("ACTION: ", action)

            state.message = null
        }
    }
})

export const callNotification = (text, time) =>
{
    return (dispatch) =>
    {

        dispatch(setNotification(text));

        setTimeout(() =>
        {
            dispatch(setRemoveMessage());
        }, time * 1000);
    }
}

export const { setNotification, setRemoveMessage } = notificationSlice.actions
export default notificationSlice.reducer