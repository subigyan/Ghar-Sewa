import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import authState from "../atoms/authAtom";

const Nav = () => {
  let links = [
    { name: "Home", link: "/" },
    { name: "Discover Services", link: "/" },
    { name: "About us", link: "/" },
    { name: "For Business", link: "/", unique: true },
  ];

  const [user, setUser] = useRecoilState(authState);
  console.log(user);

  let [open, setOpen] = useState(false);
  return (
    <div
      className=" w-full fixed 1;''
        74
         top-0 left-0"
    >
      <div className="md:flex items-center justify-between  py-4 md:px-10 px-7">
        <div className="flex items-center justify-between">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center  
                        text-gray-800"
          >
            Ghar Sewa
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl -6 cursor-pointer md:hidden"
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>

        <ul
          className={`flex md:flex-row flex-col md:items-center md:pb-0 pb-2 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0  pl-7 transition-all duration-500  text-base ${
            open ? "top-16 " : "-top-[400px] "
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 md:my-0 my-2 font-medium">
              <Link
                to={link.link}
                className={`text-gray-800 hover:text-gray-400 duration-500  ${
                  link.unique && "text-black_1 hover:text-dark_green "
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {user ? (
            <button
              className="bg-black_1 text-white  py-2 px-6 rounded md:ml-8 hover:bg-gray-800 
                                duration-500 md:w-auto w-32 md:my-0 my-2"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="md:ml-8 md:my-0 my-2 font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="bg-black_1 text-white  py-2 px-6 rounded md:ml-8 hover:bg-gray-800 
                                duration-500 md:w-auto w-32 md:my-0 my-2"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
