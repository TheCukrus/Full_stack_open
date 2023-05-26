import React from "react";

const Weather = ({ weather }) =>
{
    console.log(weather)
    return (
        <>
            {!weather ? <p></p>
                : <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.name} />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            }
        </>

    )
}

export default Weather;
