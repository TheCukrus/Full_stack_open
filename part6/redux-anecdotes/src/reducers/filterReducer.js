

const reducer = (state = "ALL", action) =>
{
    console.log("ACTION: ", action)
    console.log("STATE: ", state)

    switch (action.type)
    {
        case "FILTER":
            return action.payload

        default: return state
    }
}

export const filter = (text) =>
{
    return {
        type: "FILTER",
        payload: { text }
    }
}


export default reducer