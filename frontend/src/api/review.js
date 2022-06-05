import axios from "../helpers/axiosInstance";

const PROVIDER_REVIEW_URL = "/reviews/serviceProvider/";
const POST_REVIEW_URL = "/reviews";
const CUSTOMER_REVIEW_URL = "/reviews/customer/";
const UPDATE_REVIEW_URL = "/reviews/";
const DELETE_REVIEW_URL = "/reviews/";
const REVIEW_STATS = "/reviews/stats/";
const GET_ALL_REVIEWS = "/reviews/all/";

export const getServiceProviderReviews = async (id, text, sort) => {
  console.log("send", id);
  const response = await axios.get(`${PROVIDER_REVIEW_URL}${id}`, {
    params: {
      text,
      sort,
    },
  });
  console.log(response);
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

export const getCustomerReviews = async (id, text, sort) => {
  const response = await axios.get(`${CUSTOMER_REVIEW_URL}${id}`, {
    params: {
      text,
      sort,
    },
  });

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

export const getReviewStats = async (id) => {
  const response = await axios.get(`${REVIEW_STATS}${id}`);
  return response.data;
};

export const getAllReviews = async (text, sort) => {
  const response = await axios.get(`${GET_ALL_REVIEWS}`, {
    params: { text, sort },
  });
  return response.data;
};
