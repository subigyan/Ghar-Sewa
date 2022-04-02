import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import authState from "../atoms/authAtom";
import useDeviceProvider from "../hooks/useDeviceProvider";

const Nav = () => {
  let links = [
    { name: "Home", link: "/" },
    { name: "Discover Services", link: "/" },
    { name: "About us", link: "/" },
    { name: "For Business", link: "/business", unique: true },
  ];

  const [isMobile, isTab] = useDeviceProvider();

  const [user, setUser] = useRecoilState(authState);

  let [open, setOpen] = useState(false);
  return (
    <div className=" w-full fixed top-0 left-0 h-20 ">
      <div className="lg:flex items-center justify-between  py-4 lg:px-14 px-7">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div
              className="font-bold text-2xl cursor-pointer flex items-center  
                        text-gray-800"
            >
              Ghar Sewa
            </div>
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl -6 cursor-pointer lg:hidden"
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>

        <ul
          className={`flex lg:flex-row flex-col lg:items-center lg:pb-0 pb-2 absolute lg:static  lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0  pl-7 transition-all duration-500  text-base ${
            open ? "top-16 " : "-top-[400px] "
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className={`lg:ml-8 lg:my-0 my-2 font-medium  ${
                !isTab && link.unique
                  ? "underline-animation-unique"
                  : !isTab
                  ? "underline-animation"
                  : ""
              } `}
            >
              <Link
                to={link.link}
                className={`text-gray-800 hover:text-gray-400 duration-500  ${
                  link.unique && "text-indigo-600 hover:text-blue-400 "
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {user ? (
            <button
              className="bg-black_1 text-white  py-2 px-6 rounded lg:ml-8 hover:bg-gray-800 
                                duration-500 lg:w-auto w-32 lg:my-0 my-2"
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
              }}
            >
              Log Out
            </button>
          ) : (
            <div>
              <Link to="/login">
                <button
                  className={`lg:ml-8 lg:my-0 my-2 font-semibold py-2 px-6 shadow shadow-orange-400 ${
                    !isTab && " hover:scale-105 transition ease-in duration-100"
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className={`bg-black_1 text-white  py-2 px-6 rounded lg:ml-8 hover:bg-gray-800 
                                 lg:w-auto w-32 lg:my-0 my-2 ${
                                   !isTab
                                     ? "hover:scale-105 transition ease-in duration-100"
                                     : "ml-4"
                                 }`}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
