import axios from "axios";

const countriesByName = `https://studies.cs.helsinki.fi/restcountries/api/name/`
const allCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`;

const searchCountry = async (name) =>
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

export default { searchCountry }