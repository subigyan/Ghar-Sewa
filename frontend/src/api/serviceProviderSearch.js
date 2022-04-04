import axios from "../helpers/axiosInstance";

const SEARCH_URL = "/serviceProviders/search";
const GET_ONE = "/serviceProviders/provider/";

export const searchServiceProviders = async (service, location, sort) => {
  const response = await axios.get(SEARCH_URL, {
    params: {
      service,
      location,
      sort,
    },
  });
  return response.data;
};

export const getServiceProvider = async (id) => {
  const response = await axios.get(`${GET_ONE + id}`);
  return response.data;
};
