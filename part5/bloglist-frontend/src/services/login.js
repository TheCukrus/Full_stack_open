import axios from "axios";

const baseUrl = "/api/login";

const login = async (credential) =>
{
    try
    {
        const login = await axios.post(baseUrl, credential)
        return login.data
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }