import { useState, useEffect } from "react";
import { Filter } from "./Components/Filter";
import { List } from "./Components/List";
import countryService from "./services/countries";

function App() {
  const [countries, setcountries] = useState([]);
  const [filter, setFilter] = useState("");

useEffect(() => {
    countryService.getCountries().then((response) => {
      setcountries(response.data);
    });
  });

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

   const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

const selectCountry = (country) => {
  setFilter(country.name.common);
};

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <List filteredCountries={filteredCountries} filter={filter} selectCountry={selectCountry}/>
    </div>
  );
}

export default App;
