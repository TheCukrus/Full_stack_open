import { useState, useEffect } from "react";
import servises from "./servises/countries.js";

const App = () =>
{
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([]);


  //functions
  const fetchCountries = () =>
  {
    servises.searchCountry()
      .then(response => setCountries(response.data))
  }

  // console.log(countries)

  const countryFilter = countries.filter((ele) =>
  {
    const countryName = ele.name.common.toLowerCase();
    return countryName.includes(search.toLowerCase());
  })
  console.log(countryFilter);

  //handlers
  const handleOnChange = (e) => setSearch(e.target.value)


  //useEffects
  useEffect(() =>
  {
    fetchCountries()
  }, [])


  return (
    <div>
      <div>
        <span>find countries</span>
        <input type="search" value={search} onChange={handleOnChange} />
      </div>
      <div>
        {countryFilter.length === 250 || countryFilter.length === 0 ? <p></p>
          : countryFilter.length < 250 && countryFilter.length > 10 ? <p>Too many matches, specify another filter</p>
            : countryFilter.length < 10 && countryFilter.length > 1 ? countryFilter.map((ele) => <p key={ele.name.common}>{ele.name.common}</p>)
              :
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

        }

      </div>
    </div>
  )
}

export default App;

/*
https://studies.cs.helsinki.fi/restcountries/api/all
https://studies.cs.helsinki.fi/restcountries/api/name/{name}
*/