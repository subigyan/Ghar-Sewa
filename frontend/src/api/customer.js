import { customerAxiosInstance as axios } from "../helpers/axiosInstance";

const API_URL = "/customers";

//register
export const register = async (user) => {
  const response = await axios.post(API_URL + "/register", user);
  if (response?.data?.data) {
    localStorage.setItem("user", JSON.stringify(response?.data?.data));
  }
  console.log(response.data);
  return response.data;
};

export const login = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  if (response?.data?.data) {
    localStorage.setItem("user", JSON.stringify(response?.data?.data));
  }
  return response.data;
};

export const getCustomers = async (name) => {
  const response = await axios.get(API_URL, {
    params: {
      name,
    },
  });
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(API_URL + "/" + id);
  return response.data;
};
