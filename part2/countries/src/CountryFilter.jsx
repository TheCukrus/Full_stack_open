import React from "react";
import servises from "./servises/countries.js";

const CountryFilter = ({ name, setCountries }) =>
{
    return (
        <div>
            <span>{name}</span>
            <input
                type="button"
                value="show"
                onClick={() => servises.findCountryByName(name)
                    .then(response => setCountries([response.data]))
                } />
        </div>
    )
}

export default CountryFilter;
