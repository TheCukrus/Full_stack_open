import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = async () =>
{
    try
    {
        const response = await axios.get(baseUrl);
        return response.data;
    }
    catch (err)
    {
        console.log(err);
    }
}

const post = async (personData) =>
{
    try
    {
        const response = await axios.post(baseUrl, personData);
        return response.data
    }
    catch (err)
    {
        console.log(err);
    }
}

const remove = async (id) =>
{
    try
    {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return;
    }
    catch (err)
    {
        console.log(err);
    }
}

export default { getAll, post, remove }