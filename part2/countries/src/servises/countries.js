import axios from "axios";

const countriesByName = `https://studies.cs.helsinki.fi/restcountries/api/name/`
const allCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`;

const openWeatherApi = process.env.REACT_APP_OPENWEATHER_API_KEY

const searchCountry = async () =>
{
    try
    {
        const response = await axios.get(allCountries)
        return response;
    }
    catch (err)
    {
        console.log(err)
    }
}

const findCountryByName = async (name) =>
{
    try
    {
        const response = await axios.get(`${countriesByName}${name}`);
        return response;
    }
    catch (err)
    {
        console.log(err);
    }
}

const weatherData = async (lat, lon) =>
{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApi}&units=metric`);
    return response;
}

export default { searchCountry, findCountryByName, weatherData }