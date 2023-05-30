import axios from "axios";

const baseUrl = `http://localhost:3001/api/persons`;

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
        return await axios.delete(`${baseUrl}/${id}`)
    }
    catch (err)
    {
        console.log(err);
    }
}

const update = async (id, data) =>
{
    try
    {
        return await axios.put(`${baseUrl}/${id}`, data);
    }
    catch (err)
    {
        console.log(err);
    }
}

export default { getAll, post, remove, update }