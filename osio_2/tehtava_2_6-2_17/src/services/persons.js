import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "https://fullstack-qtjv.onrender.com/api/persons";

const getPersons = () => {
  return axios.get(baseUrl);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
