import axios from "axios";

const baseUrl = "/api/login";

const login = async (credential) =>
{
    const login = await axios.post(baseUrl, credential)
    return login.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }