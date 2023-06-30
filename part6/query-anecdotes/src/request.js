import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = async () =>
{
    try
    {
        const result = await axios.get(baseUrl)
        return result.data
    }
    catch (err)
    {
        console.log(err)
    }
}


export const create = async (data) =>
{
    try
    {
        const result = await axios.post(baseUrl, data)
        return result.data
    }
    catch (err)
    {
        console.log(err)
        throw new Error(err.response.data.error)
    }
}


export const updateVote = async (anecdote) =>
{
    try
    {
        const result = await axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
        return result.data
    }
    catch (err)
    {
        console.log(err)
    }
}