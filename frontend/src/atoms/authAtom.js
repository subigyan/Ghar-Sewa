import { atom } from "recoil";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

//Get serviceProvider from local storage
const serviceProvider = JSON.parse(localStorage.getItem("serviceProvider"));

const authState = atom({
  key: "authState",
  default: user ? user : null,
});

const serviceProviderAuthState = atom({
  key: "serviceProviderAuthState",
  default: serviceProvider ? serviceProvider : null,
});

export { authState, serviceProviderAuthState };

export default authState;
