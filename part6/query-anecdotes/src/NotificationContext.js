import { createContext, useReducer } from "react"


const notificationReducer = (state, action) =>
{
    console.log(state)
    switch (action.type)
    {
        case "VOTE":
            return `Anecdote "${action.payload}" voted `

        case "ADD":
            return `Added new anecdote ${action.payload}`

        case "REMOVE":
            return state = null

        default: return state
    }
}

const NotificationContext = createContext()

export const NotificationContexProvider = (props) =>
{
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext