// import axios from "axios";

import { serviceProviderAxiosInatance as axios } from "../helpers/axiosInstance";

const API_URL = "/serviceProviders";

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

//login
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
