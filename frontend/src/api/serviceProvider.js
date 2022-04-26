// import axios from "axios";

import { serviceProviderAxiosInatance as axios } from "../helpers/axiosInstance";

const API_URL = "/serviceProviders";
const STATS = "/serviceProviders/stats";

//register
export const register = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  console.log("register");
  if (response?.data?.data) {
    localStorage.setItem(
      "serviceProvider",
      JSON.stringify(response?.data?.data)
    );
  }
  return response.data;
};

//login
export const login = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  if (response?.data?.data) {
    localStorage.setItem(
      "serviceProvider",
      JSON.stringify(response?.data?.data)
    );
  }
  return response.data;
};

//update
export const updateServiceProvider = async (id, user) => {
  const response = await axios.put(API_URL + "/" + id, user);
  return response.data;
};

//get serviceProviders
export const getServiceProviders = async (name, sort) => {
  const response = await axios.get(API_URL, {
    params: {
      name,
      sort,
    },
  });
  return response.data;
};

//delete ServiceProvider
export const deleteServiceProvider = async (id) => {
  const response = await axios.delete(API_URL + "/" + id);
  return response.data;
};

export const getStats = async () => {
  const response = await axios.get(STATS);
  return response.data;
};
