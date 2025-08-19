import { useState, useEffect } from "react";
export const List = (props) => {
  const [weather, setWeather] = useState(null);

  const baseUrl = "http://api.weatherapi.com/v1";

  useEffect(() => {
    if (props.filteredCountries.length === 1) {
      const country = props.filteredCountries[0];
      const capital = country.capital?.[0] || country.capital;
      const location = capital || country.name.common;

      const url = `${baseUrl}/current.json?key=${import.meta.env.VITE_API_KEY}&q=${location}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        });
    }
  }, [props.filteredCountries]);

  return (
    <div>
      {props.filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : props.filteredCountries.length === 1 ? (
        <div>
          <h1>{props.filteredCountries[0].name.common}</h1>
          {props.filteredCountries[0].capital && (
            <p>Capital {props.filteredCountries[0].capital[0]}</p>
          )}
          <p>Area {props.filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(props.filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={props.filteredCountries[0].flags.png}
            alt={props.filteredCountries[0].flags.alt}
          />
          <h2>Weather in {props.filteredCountries[0].capital}</h2>
          {weather && (
            <div>
              <p>Temperature {weather.current.temp_c}°C</p>
              <img src={weather.current.condition.icon} alt="weather icon" />
              <p>
                Wind{" "}
                {(parseFloat(weather.current.wind_kph) * 0.27777778).toFixed(1)}{" "}
                m/s
              </p>
            </div>
          )}
        </div>
      ) : (
        props.filteredCountries.map((country, index) => (
          <p key={index}>
            {country.name.common}{" "}
            <button onClick={() => props.selectCountry(country)}>Show</button>
          </p>
        ))
      )}
    </div>
  );
};
