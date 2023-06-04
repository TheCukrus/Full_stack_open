import axios from "axios";

let baseUrl
if (process.env.NODE_ENV === "development")
{
    baseUrl = `http://localhost:3001/api/persons`;
}
else
{
    baseUrl = `https://tester-0fyf.onrender.com/api/persons`;
}

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
        return { "message": err.response.data.error, "nameOfClass": "error" }
    }
}

const post = async (personData) =>
{
    try
    {
        const response = await axios.post(baseUrl, personData);
        return { "message": `Added ${response.data.name}`, "nameOfClass": "success" }
    }
    catch (err)
    {
        console.log(err);
        return { "message": err.response.data.error, "nameOfClass": "error" }
    }
}

const remove = async (id, name) =>
{
    try
    {
        await axios.delete(`${baseUrl}/${id}`)
        return { "message": `Removed ${name}`, "nameOfClass": "success" }

    }
    catch (err)
    {
        console.log(err);
        if (!err.response.data)
        {
            return { "message": "Person already removed", "nameOfClass": "error" }
        }
        return { "message": err.response.data.error, "nameOfClass": "error" }
    }
}

const update = async (id, data) =>
{
    try
    {
        await axios.put(`${baseUrl}/${id}`, data);
        return { "message": `Updated ${data.name}`, "nameOfClass": "success" }

    }
    catch (err)
    {
        console.log(err);
        return { "message": err.response.data.error, "nameOfClass": "error" }
    }
}

export default { getAll, post, remove, update }