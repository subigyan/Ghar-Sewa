import React, { useEffect } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Nav from "../../components/Nav";
import AOS from "aos";
import "aos/dist/aos.css";
import "./home.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex flex-col justify-center lg:items-start items-center  back px-4 pb-16 lg:pl-32 ">
        <h1
          className="text-5xl font-bold text-gray-800 mb-8 tracking-wide lg:w-[800px] w-[80%] "
          data-aos="fade-in"
        >
          Discover Household <br />
          Service Providers Near You
        </h1>
        <div
          className=" h-14  lg:w-[800px] w-[80%] bg-white rounded-md flex items-center pl-2 shadow-2xl"
          data-aos="fade-in"
        >
          <div className="flex items-center w-4/12  h-full py-2">
            <BiLocationPlus className="text-2xl text-brown w-12" />
            <input
              class="h-full px-2 text-lg outline-none w-full"
              type="text"
              name=""
              id=""
              placeholder="Search Location"
            />
          </div>
          <div className="border-l-2 border-gray-400 h-8 mr-2"></div>
          <div className="w-7/12  h-full flex items-center py-2">
            <FaTools className="text-xl text-brown w-12" />
            <input
              class="h-full px-2 text-lg outline-none w-full"
              type="text"
              name=""
              id=""
              placeholder="Search Service Type"
            />
          </div>
          <button className="w-1/12 bg-[#0B1007] h-full ml-2 flex justify-center items-center rounded-r-md">
            <FiSearch className="text-xl text-white " />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
