import axios from 'axios'
const baseUrl = '/api/blogs'

let token = window.localStorage.token

if (token)
{
  token = JSON.parse(window.localStorage.token)
  token = `Bearer ${token.token}`
}

const getAll = async () =>
{
  try
  {
    const request = await axios.get(baseUrl)
    return request.data
  }
  catch (err)
  {
    console.log(err)
  }
}

const create = async (data) =>
{
  try
  {
    const config = {
      headers: { "authorization": token }
    }
    const response = await axios.post(baseUrl, data, config)
    return response.data
  }
  catch (err)
  {
    console.log(err)
  }
}

const updateLikes = async (data, id) =>
{
  try
  {
    const config = {
      headers: { "authorization": token }
    }

    const response = await axios.put(`${baseUrl}/${id}`, data, config)
    return response.data;
  }
  catch (err)
  {
    console.log(err)
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, updateLikes }