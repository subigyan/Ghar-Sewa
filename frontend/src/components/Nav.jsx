import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import authState from "../atoms/authAtom";
import useDeviceProvider from "../hooks/useDeviceProvider";
import logo from "../assets/images/logo.png";

const Nav = ({ fixed }) => {
  let links = [
    { name: "Home", link: "/", type: "page" },
    { name: "Discover Services", link: "/#browse", type: "section" },
    { name: "About us", link: "/about", type: "page" },
    { name: "For Business", link: "/business", unique: true, type: "page" },
  ];

  const [, isTab] = useDeviceProvider();

  const [user, setUser] = useRecoilState(authState);

  const [userHover, setUserHover] = useState(false);

  let [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let nav = document.querySelector(".nav");
      nav.classList.toggle("scrolled", window.scrollY > 0);
    });
  }, []);

  return (
    <div
      className={`nav w-full  ${
        fixed && "fixed"
      } top-0 left-0 h-20 shadow-lg rounded-b-sm  z-40 bg-white`}
    >
      <div className="lg:flex items-center justify-between  py-4 lg:px-14 px-7">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div
              className="font-bold text-2xl cursor-pointer flex items-center  
                        text-gray-800"
            >
              {/* Ghar Sewa */}
              <img src={logo} alt="logo" className="w-52" />
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
          className={`flex lg:flex-row flex-col lg:items-center lg:pb-0 pb-2 absolute lg:static    lg:z-auto  left-0 w-full   lg:w-auto lg:pl-0  pl-7 transition-all duration-500  text-base  ${
            open
              ? "top-20 bg-white shadow-neutral-700 shadow-md border-t z-50"
              : "-top-[400px] "
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
              {link.type === "page" ? (
                <Link
                  to={link.link}
                  className={`text-gray-800 hover:text-gray-400 duration-500  ${
                    link.unique && "text-indigo-600 hover:text-blue-400 "
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.link}
                  className={`text-gray-800 hover:text-gray-400 duration-500  ${
                    link.unique && "text-indigo-600 hover:text-blue-400 "
                  }`}
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
          {user ? (
            <>
              <div className="lg:ml-8 relative z-50 lg:block hidden">
                <div
                  className="w-full  cursor-pointer"
                  onMouseEnter={() => {
                    setUserHover(true);
                  }}
                  onMouseLeave={() => {
                    setUserHover(false);
                  }}
                >
                  <Avatar className="">{user?.name?.[0]}</Avatar>
                </div>
                {userHover && (
                  <div
                    className="absolute w-52 shadow-lg border-2 bg-slate-100 rounded-l-lg rounded-b-lg right-4 cursor-pointer p-4 flex flex-col  gap-2 font-medium"
                    onMouseEnter={() => {
                      setUserHover(true);
                    }}
                    onMouseLeave={() => {
                      setUserHover(false);
                    }}
                  >
                    <Link to="/reviews">
                      <div className=" text-indigo-900 hover:underline">
                        My Reviews
                      </div>
                    </Link>
                    <Link to="/quotations">
                      <div className="text-indigo-900 hover:underline">
                        Quotation Requests
                      </div>
                    </Link>

                    <div
                      className="text-orange-600 hover:underline"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
              <li className={`lg:ml-8 lg:my-0 my-2 font-medium  lg:hidden `}>
                <Link to="/reviews">
                  <div className=" text-indigo-900 hover:underline">
                    My Reviews
                  </div>
                </Link>
              </li>
              <li className={`lg:ml-8 lg:my-0 my-2 font-medium  lg:hidden `}>
                <Link to="/quotations">
                  <div className="text-indigo-900 hover:underline">
                    Quotation Requests
                  </div>
                </Link>
              </li>
              <li className={`lg:ml-8 lg:my-0 my-2 font-medium  lg:hidden `}>
                <Link to="/reviews">
                  <div className=" text-indigo-900 hover:underline">
                    <div
                      className="text-orange-600 hover:underline"
                      onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <div>
              <Link to="/login">
                <button
                  className={`lg:ml-8 lg:my-0 my-2 font-semibold py-2 px-6 shadow rounded shadow-primary ${
                    !isTab && " hover:scale-105 transition ease-in duration-100"
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className={`bg-dark text-white  py-2 px-6 rounded lg:ml-8 hover:bg-gray-800 
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

Nav.defaultProps = {
  fixed: true,
};

export default Nav;
