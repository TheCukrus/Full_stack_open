import React from "react";

const CountryInfo = ({countryFilter}) =>
{
    return (
        <div>
            <h1>{countryFilter[0].name.common}</h1>
            Capital {countryFilter[0].capital[0]} <br />
            Area {countryFilter[0].area}
            <h3>languages:</h3>
            <ul>
                {Object.values(countryFilter[0].languages).map((ele) => <li key={ele}>{ele}</li>)}
            </ul>

            <img src={countryFilter[0].flags.png} alt={countryFilter[0].flags.alt} />
        </div>
    )
}

export default CountryInfo;