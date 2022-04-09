import axios from "../helpers/axiosInstance";

const CUSTOMER_QUOTATION_URL = "/quotations/customer/";
const POST_QUOTATION_URL = "/quotations";
const UPDATE_QUOTATION_URL = "/quotations/";
const DELETE_QUOTATION_URL = "/quotations/";
const SEARCH_QUOTATION_URL = "/quotations/search";

export const getCustomerQuotations = async (id) => {
  const response = await axios.get(`${CUSTOMER_QUOTATION_URL}${id}`);
  return response.data;
};

export const postQuotation = async (quotation) => {
  console.log(quotation);
  const { customer, requestHeadline, requestBody, service, requestImage } =
    quotation;
  const response = await axios.post(POST_QUOTATION_URL, {
    customer,
    requestHeadline,
    requestBody,
    service,
    requestImage,
  });
  return response.data;
};

export const updateQuotation = async (id, quotation) => {
  const response = await axios.put(`${UPDATE_QUOTATION_URL}${id}`, quotation);
  return response.data;
};

export const deleteQuotation = async (id) => {
  const response = await axios.delete(`${DELETE_QUOTATION_URL}${id}`);
  return response.data;
};

export const getAllQuotations = async () => {
  const response = await axios.get(`${CUSTOMER_QUOTATION_URL}`);
  return response.data;
};

export const searchQuotation = async (service) => {
  const response = await axios.get(`${SEARCH_QUOTATION_URL}`, {
    params: {
      service,
    },
  });
  return response.data;
};
