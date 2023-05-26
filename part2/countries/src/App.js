import { useState, useEffect } from "react";
import CountryFilter from "./CountryFilter.jsx";
import CountryInfo from "./CountryInfo.jsx";
import SearchBar from "./SearchBar.jsx";
import servises from "./servises/countries.js";
import Weather from "./Weather.jsx";

const App = () =>
{
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null)

  //functions
  const fetchCountries = () =>
  {
    servises.searchCountry()
      .then(response => setCountries(response.data))
  }

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

  useEffect(() =>
  {
    if (countryFilter.length === 1)
    {
      let lat = countryFilter[0].capitalInfo.latlng[0];
      let lon = countryFilter[0].capitalInfo.latlng[1];
      servises.weatherData(lat, lon)
        .then(response => setWeather(response.data));
    }
  }, [countryFilter.length])

  console.log(weather)
  return (
    <div>
      <SearchBar search={search} handleOnChange={handleOnChange} />
      <br />
      <div>
        {countryFilter.length === 250 || countryFilter.length === 0 ? <p></p>
          : countryFilter.length < 250 && countryFilter.length > 10 ? <p>Too many matches, specify another filter</p>
            : countryFilter.length < 10 && countryFilter.length > 1
              ? countryFilter.map((ele) => <CountryFilter key={ele.name.common} name={ele.name.common} setCountries={setCountries} />)
              :
              <>
                <CountryInfo countryFilter={countryFilter} />
                <Weather weather={weather} />
              </>
        }

      </div>
    </div>
  )
}

export default App;