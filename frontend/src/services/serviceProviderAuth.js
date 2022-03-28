import axios from "axios";

const API_URL = "http://localhost:5000/api/serviceProviders";

//register
export const register = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  if (response.data) {
    localStorage.setItem(
      "serviceProvider",
      JSON.stringify(response?.data?.data?.token)
    );
  }
  console.log(response.data);
  return response.data;
};

export const login = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  if (response.data) {
    localStorage.setItem(
      "serviceProvider",
      JSON.stringify(response?.data?.data?.token)
    );
  }
  return response.data;
};
