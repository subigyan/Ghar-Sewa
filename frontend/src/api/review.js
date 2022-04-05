import axios from "../helpers/axiosInstance";

const PROVIDER_REVIEW_URL = "/reviews/serviceProvider/";
const POST_REVIEW_URL = "/reviews";
const CUSTOMER_REVIEW_URL = "/reviews/customer/";
const UPDATE_REVIEW_URL = "/reviews/";
const DELETE_REVIEW_URL = "/reviews/";

export const getServiceProviderReviews = async (id) => {
  const response = await axios.get(`${PROVIDER_REVIEW_URL}${id}`);
  return response.data;
};

export const postReview = async (serviceProviderReview) => {
  const { rating, reviewHeadline, review, customer, serviceProvider } =
    serviceProviderReview;

  console.log(serviceProviderReview);
  const response = await axios.post(POST_REVIEW_URL, {
    rating,
    reviewHeadline,
    review,
    customer,
    serviceProvider,
  });
  return response.data;
};

export const getCustomerReviews = async (id) => {
  const response = await axios.get(`${CUSTOMER_REVIEW_URL}${id}`);

  return response.data;
};

export const updateReview = async (id, review) => {
  console.log(id, review);
  const response = await axios.put(`${UPDATE_REVIEW_URL}${id}`, review);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(`${DELETE_REVIEW_URL}${id}`);
  return response.data;
};
