import axios from "../helpers/axiosInstance";

const SEARCH_URL = "/serviceProviders/search";

export const searchServiceProviders = async (service, location, sort) => {
  const response = await axios.get(SEARCH_URL, {
    params: {
      service,
      location,
    },
  });
  return response.data;
};
