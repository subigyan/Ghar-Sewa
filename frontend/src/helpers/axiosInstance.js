import axios from "axios";

//base url from env file
const baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(baseURL, "baseURL");

// const customerHeader = {};
// const sericeProviderHeader = {};

// //header for customer with customer token
// if (localStorage.getItem("user")) {
//   customerHeader.Authorization = `Bearer ${
//     JSON.parse(localStorage.getItem("user")).token
//   }`;
// }

// //header for serviceProvider with serviceProvider token
// if (localStorage.getItem("serviceProvider")) {
//   sericeProviderHeader.Authorization = `Bearer ${
//     JSON.parse(localStorage.getItem("serviceProvider")).token
//   }`;
// }

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const customerAxiosInstance = axios.create({
  baseURL: baseURL,
  // headers: customerHeader,
});

const serviceProviderAxiosInatance = axios.create({
  baseURL: baseURL,
  // headers: sericeProviderHeader,
});

export { customerAxiosInstance, serviceProviderAxiosInatance };

export default axiosInstance;
