import { createContext, useReducer } from "react"


const userReducer = (state, action) =>
{
    // console.log("State: ", state)
    // console.log("Action:", action)
    switch (action.type)
    {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) =>
{

    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext