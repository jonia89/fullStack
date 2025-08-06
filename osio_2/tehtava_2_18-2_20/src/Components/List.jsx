export const List = (props) => {
  return (
    <div>
      {/* {props.filteredCountries.length === 1 ? (
        <div>
          <h1>{props.filteredCountries.name}</h1>
          <p>{}</p>
        </div>
      ) : (
        ""
      )} */}

      {props.filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : props.filteredCountries.length === 1 ? (
        <div>
          <h1>{props.filteredCountries[0].name.common}</h1>
          <p>Capital {props.filteredCountries[0].capital}</p>
          <p>Area {props.filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(props.filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={props.filteredCountries[0].flags.png} alt={props.filteredCountries[0].flags.alt} />
        </div>
      ) : (
        props.filteredCountries.map((country, index) => (
          <p key={index}>{country.name.common}</p>
        ))
      )}
    </div>
  );
};
