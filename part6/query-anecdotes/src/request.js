import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseUrl).then(res => res.data)

export const create = (data) => axios.post(baseUrl, data).then(res => res.data)

export const updateVote = (anecdote) => axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })