import axios from 'axios'
const baseUrl = '/api/blogs'

let token = JSON.parse(window.localStorage.token)

if (token)
{
  token = `Bearer ${token.token}`
}

const setToken = newToken =>
{
  token = `Bearer ${newToken}`
}

const getAll = () =>
{
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) =>
{
  const config = {
    headers: { "authorization": token }
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }