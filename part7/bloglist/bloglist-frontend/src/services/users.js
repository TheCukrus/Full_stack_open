import axios from "axios"
const baseUrl = "/api/users"

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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }