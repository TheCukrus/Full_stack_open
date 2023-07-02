import React from "react"

const Country = ({ country }) =>
{
    console.log(country)
    if (!country)
    {
        return null
    }

    if (!country.found)
    {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.name.common} </h3>
            <div>capital {country.capital} </div>
            <div>population {country.population}</div>
            <img src={country.flags.png} height='100' alt={country.flags.alt} />
        </div>
    )
}

export default Country