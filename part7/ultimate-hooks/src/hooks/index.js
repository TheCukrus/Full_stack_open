import { useState } from 'react'
import axios from 'axios'

export const useField = (type) =>
{
    const [value, setValue] = useState('')

    const onChange = (event) =>
    {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) =>
{
    const [resources, setResources] = useState([])

    const getAll = async () =>
    {
        try
        {
            const result = await axios.get(baseUrl)
            return setResources(result.data)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const create = async (resource) =>
    {
        try
        {
            const result = await axios.post(baseUrl, resource)
            setResources([...resources.concat(result.data)])
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const service = {
        create,
        getAll
    }

    return [
        resources, service
    ]
}
