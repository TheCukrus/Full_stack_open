/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"

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

export const useCountry = (name) =>
{
    const [country, setCountry] = useState(null)

    const getCountry = async (country) =>
    {
        try
        {
            const result = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
            console.log(result)
            result.data.found = true
            setCountry(result.data)
        }
        catch (err)
        {
            setCountry(err)
        }
    }

    useEffect(() => 
    {
        if (name)
        {
            getCountry(name)
        }
    }, [name])

    return country
}
