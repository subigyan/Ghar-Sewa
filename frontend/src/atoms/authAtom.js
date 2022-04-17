import { atom } from "recoil";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

//Get serviceProvider from local storage
const serviceProvider = JSON.parse(localStorage.getItem("serviceProvider"));

//get admin from local storage
const admin = JSON.parse(localStorage.getItem("admin"));

const authState = atom({
  key: "authState",
  default: user ? user : null,
});

const serviceProviderAuthState = atom({
  key: "serviceProviderAuthState",
  default: serviceProvider ? serviceProvider : null,
});

const adminAuthState = atom({
  key: "adminAuthState",
  default: admin ? admin : null,
});

export { authState, serviceProviderAuthState, adminAuthState };

export default authState;
