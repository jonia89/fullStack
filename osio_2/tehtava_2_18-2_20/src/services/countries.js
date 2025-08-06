import axios from "axios";

const getCountries = () => {
  return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
};

const getCountry = (country) => {
  return axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
  );
};

export default {
  getCountries,
  getCountry,
};
