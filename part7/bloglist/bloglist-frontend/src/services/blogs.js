import axios from "axios"
const baseUrl = "/api/blogs"

const getToken = () =>
{
  const tokenFromStorage = window.localStorage.getItem("token")
  return tokenFromStorage ? `Bearer ${JSON.parse(tokenFromStorage).token}` : null
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
      headers: { "authorization": getToken() }
    }
    const response = await axios.post(baseUrl, data, config)
    return response.data
  }
  catch (err)
  {
    console.log(err)
  }
}

const updateLikes = async (data) =>
{
  try
  {
    const config = {
      headers: { "authorization": getToken() }
    }

    const response = await axios.put(`${baseUrl}/${data.id}`, { "likes": data.likes + 1 }, config)
    return response.data
  }
  catch (err)
  {
    console.log(err)
  }
}

const remove = async (id) =>
{
  try
  {
    const config = {
      headers: { "authorization": getToken() }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }
  catch (err)
  {
    console.log(err)
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, updateLikes, remove }