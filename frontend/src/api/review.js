import axios from "../helpers/axiosInstance";

const PROVIDER_REVIEW_URL = "/reviews/serviceProvider";
const POST_REVIEW_URL = "/reviews";

export const getReviews = async (id) => {
  const response = await axios.get(`${PROVIDER_REVIEW_URL}/${id}`);
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
