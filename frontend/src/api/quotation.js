import axios from "../helpers/axiosInstance";

const CUSTOMER_QUOTATION_URL = "/quotations/customer/";
const POST_QUOTATION_URL = "/quotations";
const UPDATE_QUOTATION_URL = "/quotations/";
const DELETE_QUOTATION_URL = "/quotations/";
const SEARCH_QUOTATION_URL = "/quotations/search";
const ADD_QUOTE_URL = "/quotations/addQuote/";
const SERVICEPPROVIDER_QUOTATION_URL = "/quotations/serviceprovider/";
const EDIT_SERVICEPROVIDER_QUOTE_URL = "/quotations/editquote/";
const DELETE_SERVICEPROVIDER_QUOTE_URL = "/quotations/deletequote/";
const ALL_QUOTATIONS_URL = "/quotations/all";
const QUOTATION_STATS_URL = "/quotations/stats";

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

export const searchQuotation = async (service) => {
  const response = await axios.get(`${SEARCH_QUOTATION_URL}`, {
    params: {
      service,
    },
  });
  return response.data;
};

export const addQuote = async (quoteInfo) => {
  const { id, serviceProvider, quote } = quoteInfo;
  console.log(quoteInfo);
  const response = await axios.post(`${ADD_QUOTE_URL}${id}`, {
    serviceProvider,
    quote,
  });
  return response.data;
};

export const getServiceProviderQuotes = async (id, text, sort) => {
  const response = await axios.get(`${SERVICEPPROVIDER_QUOTATION_URL}${id}`, {
    params: {
      text,
      sort,
    },
  });
  return response.data;
};

export const editServiceProviderQuote = async (id, quote) => {
  const response = await axios.put(`${EDIT_SERVICEPROVIDER_QUOTE_URL}${id}`, {
    quote,
  });
  return response.data;
};

export const deleteServiceProviderQuote = async (id) => {
  const response = await axios.delete(
    `${DELETE_SERVICEPROVIDER_QUOTE_URL}${id}`
  );
  return response.data;
};

export const getAllQuotations = async (text, name) => {
  const response = await axios.get(`${ALL_QUOTATIONS_URL}`, {
    params: {
      text,
      name,
    },
  });
  return response.data;
};

export const getQuotationStats = async () => {
  const response = await axios.get(`${QUOTATION_STATS_URL}`);
  return response.data;
};
