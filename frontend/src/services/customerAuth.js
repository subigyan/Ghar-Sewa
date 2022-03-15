import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

//register
export const register = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

export const login = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
