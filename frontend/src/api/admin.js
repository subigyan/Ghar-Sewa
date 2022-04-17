import axios from "../helpers/axiosInstance";

const API_URL = "/admin";

export const login = async (user) => {
  const response = await axios.post(API_URL + "/login", user);
  if (response?.data?.data) {
    localStorage.setItem("admin", JSON.stringify(response?.data?.data));
  }
  return response.data;
};
