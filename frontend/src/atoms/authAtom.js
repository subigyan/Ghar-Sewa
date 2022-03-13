import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const authState = atom({
  key: "authState",
  default: user ? user : null,
});

export default authState;
