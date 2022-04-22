import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Nav from "../../../components/Nav";
import AOS from "aos";
import "aos/dist/aos.css";
import "./home.css";
import Typewriter from "typewriter-effect";
import axios from "axios";
import homeBackImage from "../../../assets/images/home-back.jpg";
import reviewImage from "../../../assets/icons/reviews.png";
import workerImage from "../../../assets/icons/workers.png";
import customerImage from "../../../assets/icons/team.png";
import technicianImage from "../../../assets/images/technician.png";
import toolImage from "../../../assets/images/tools.png";

import { GiTap, GiElectric } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiMechanicGarage } from "react-icons/gi";
import { MdHandyman } from "react-icons/md";
import { GiHandSaw } from "react-icons/gi";
import { FaSpinner } from "react-icons/fa";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/62526c337b967b117989b739/1g08vdag5";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  const [location, setLocation] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");

  const [submited, setSubmited] = useState(false);

  return (
    <div className=" overflow-x-hidden">
      <Nav />
      <div className=""></div>
      <img
        src={toolImage}
        className="w-screen h-screen absolute -z-20 object-cover"
        alt="back"
      />
      <img
        src={homeBackImage}
        className="w-screen h-screen fixed -z-40"
        alt="back"
      />

      {/* <div className="w-screen h-screen flex   items-center pb-16 bg-[#ffba19c9]">
        <div className="md:w-7/12 w-full  lg:pl-16 ">
          <h1
            className="sm:text-5xl text-4xl  font-bold text-gray-800 mb-8 tracking-wide lg:w-[710px]  w-[90%]  mt-10 md:px-0 px-8"
            data-aos="fade-in"
          >
            <Typewriter
              options={{
                // autoStart: true,
                loop: false,
                delay: 70,
                changeDelay: 1,
              }}
              onInit={(typewriter) => {
                // typewriter.pauseFor(300)
                typewriter
                  .typeString("Discover Household Service Providers Near You")
                  .pauseFor(2000)
                  .start();
              }}
            />
          </h1>

          <form
            className="h-14  lg:w-[800px]  w-[90%] bg-white rounded-md md:flex hidden  items-center pl-2 shadow-2xl"
            data-aos="fade-in"
            action="search"
            onSubmit={(e) => {
              setSubmited(true);
            }}
          >
            <div className="flex items-center w-5/12  h-full py-2 relative">
              <FaTools className="text-xl text-brown w-12" />
              <input
                className="h-full px-2 text-lg outline-none w-full"
                type="text"
                name="service"
                id="type"
                placeholder="plumber, electrician"
                required
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                autoComplete="off"
                list="browsers"
              />
            </div>
            <div className="border-l-2 border-gray-400 h-8 mr-2"></div>
            <div className="w-6/12  h-full flex items-center py-2">
              <BiLocationPlus className="text-2xl text-brown w-12" />
              <input
                className="h-full px-2 text-lg outline-none w-full"
                type="text"
                name="location"
                id="location"
                placeholder="Search Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="w-1/12 bg-[#0B1007] h-full ml-2 flex justify-center items-center rounded-r-md">
              {submited ? (
                <FaSpinner className="text-xl text-white animate-spin" />
              ) : (
                <FiSearch className="text-xl text-white" />
              )}
            </button>
          </form>
          <form
            className="mt-3 w-full px-8 md:hidden flex flex-col gap-4  "
            data-aos="fade-in"
            action="search"
            onSubmit={(e) => {
              setSubmited(true);
            }}
          >
            <div className="flex items-center w-full  py-2   rounded border-2 shadow-md bg-white">
              <FaTools className="text-xl text-brown w-12" />
              <input
                className="h-full px-2 text-lg outline-none w-full  "
                type="text"
                name="service"
                id="type"
                placeholder="Search Service Category"
                required
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex items-center w-full  py-2   rounded border-2 shadow-md bg-white">
              <BiLocationPlus className="text-2xl text-brown w-12 " />
              <input
                className="h-full px-2 text-lg outline-none w-full"
                type="text"
                name="location"
                id="location"
                placeholder="Search Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                autoComplete="off"
              />
            </div>
            <button className="w-full bg-[#0B1007] h-10  flex justify-center items-center rounded-r-md shadow-md">
              {submited ? (
                <FaSpinner className="text-xl text-white animate-spin" />
              ) : (
                <span className="text-xl text-white"> Search </span>
              )}
            </button>
          </form>
        </div>
        <div className="w-4/12  lg:pl-16 md:block hidden">
          <img src={technicianImage} alt="" className="mt-16 h-96" />
        </div>
      </div> */}
      {/* bg-[#ffba19c9]"  bg-[#ffbc57d8]*/}

      <div
        className="w-screen h-screen flex flex-col justify-center lg:items-start items-center pb-16 lg:pl-32 bg-[#ffcd57e5]
      "
      >
        <h1
          className="sm:text-5xl text-4xl  font-bold text-gray-800 mb-8 tracking-wide lg:w-[710px]  w-[90%]  mt-10"
          data-aos="fade-in"
        >
          <Typewriter
            options={{
              // autoStart: true,
              loop: false,
              delay: 70,
              changeDelay: 1,
            }}
            onInit={(typewriter) => {
              // typewriter.pauseFor(300)
              typewriter
                .typeString("Discover Household Service Providers Near You")
                .pauseFor(2000)
                .start();
            }}
          />
        </h1>

        <form
          className="h-14  lg:w-[800px]  w-[90%] bg-white rounded-md md:flex hidden  items-center pl-2 shadow-2xl"
          data-aos="fade-in"
          action="search"
          onSubmit={(e) => {
            setSubmited(true);
          }}
        >
          <div className="flex items-center w-5/12  h-full py-2 relative">
            <FaTools className="text-xl text-brown w-12" />
            <input
              className="h-full px-2 text-lg outline-none w-full"
              type="text"
              name="service"
              id="type"
              placeholder="plumber, electrician"
              required
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              autoComplete="off"
              list="browsers"
            />
          </div>
          <div className="border-l-2 border-gray-400 h-8 mr-2"></div>
          <div className="w-6/12  h-full flex items-center py-2">
            <BiLocationPlus className="text-2xl text-brown w-12" />
            <input
              className="h-full px-2 text-lg outline-none w-full"
              type="text"
              name="location"
              id="location"
              placeholder="Search Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className="w-1/12 bg-[#0B1007] h-full ml-2 flex justify-center items-center rounded-r-md">
            {submited ? (
              <FaSpinner className="text-xl text-white animate-spin" />
            ) : (
              <FiSearch className="text-xl text-white" />
            )}
          </button>
        </form>
        <form
          className="mt-3 w-full px-8 md:hidden flex flex-col gap-4  "
          data-aos="fade-in"
          action="search"
          onSubmit={(e) => {
            setSubmited(true);
          }}
        >
          <div className="flex items-center w-full  py-2   rounded border-2 shadow-md">
            <FaTools className="text-xl text-brown w-12" />
            <input
              className="h-full px-2 text-lg outline-none w-full "
              type="text"
              name="service"
              id="type"
              placeholder="Search Service Category"
              required
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center w-full  py-2   rounded border-2 shadow-md">
            <BiLocationPlus className="text-2xl text-brown w-12" />
            <input
              className="h-full px-2 text-lg outline-none w-full"
              type="text"
              name="location"
              id="location"
              placeholder="Search Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button className="w-full bg-[#0B1007] h-10  flex justify-center items-center rounded-r-md shadow-md">
            {submited ? (
              <FaSpinner className="text-xl text-white animate-spin" />
            ) : (
              <span className="text-xl text-white"> Search </span>
            )}
          </button>
        </form>
      </div>

      <div className="border-2  py-6 bg-white " id="browse">
        <h1 className="text-3xl font-semibold text-center">
          Discover Service Providers
        </h1>

        <p className=" text-center my-5">
          Browse through our eight specific service categories to find the
          perfect service provider for your household repair and maintenance
          work.
        </p>

        <div className="flex md:justify-center mt-5 lg:px-24 md:flex-wrap overflow-x-scroll scrollbar-hide">
          <Link to="/search?service=plumber">
            <div
              className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 
          my-6 "
            >
              <div className="h-32 w-32 rounded-full  bg-[#F05C51] flex flex-center shadow-md ">
                <GiTap className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Plumber</p>
            </div>
          </Link>
          <Link to="/search?service=electrician">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#3AC0FF] flex flex-center shadow-md ">
                <GiElectric className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">
                Electircian
              </p>
            </div>
          </Link>
          <Link to="/search?service=builder">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#77DF40] flex flex-center shadow-md ">
                <BiBuildingHouse className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Builder</p>
            </div>
          </Link>
          <Link to="/search?service=painter">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#F4C837] flex flex-center shadow-md ">
                <AiOutlineFormatPainter className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Painter</p>
            </div>
          </Link>
          <Link to="/search?service=painter">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#C56DFB] flex flex-center shadow-md ">
                <GiHandSaw className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">
                Carpenter
              </p>
            </div>
          </Link>
          <Link to="/search?service=cleaner">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#FF6C00] flex flex-center shadow-md ">
                <GiVacuumCleaner className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Cleaner</p>
            </div>
          </Link>
          <Link to="/search?service=mechanic">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#FF4081] flex flex-center shadow-md ">
                <GiMechanicGarage className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Mechanic</p>
            </div>
          </Link>
          <Link to="/search?service=handyman">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#09C097] flex flex-center shadow-md ">
                <MdHandyman className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">Handyman</p>
            </div>
          </Link>
        </div>
        {/* <div className="flex justify-around mt-10 lg:px-32">
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiTap className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Plumber</p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer ">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiElectric className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Electircian</p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400  cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <BiBuildingHouse className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Builder</p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400  cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <AiOutlineFormatPainter className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Painter </p>
          </div>
        </div>
        <div className="flex justify-around mt-10 lg:px-32">
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400  cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiHandSaw className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Carpenter </p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiVacuumCleaner className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Cleaner </p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor';lk-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiMechanicGarage className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Mechanic </p>
          </div>
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <MdHandyman className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Handyman</p>
          </div>
        </div> */}
      </div>
      <div className="h-96 w-screen bg-black/40 flex flex-center ">
        <div className="flex items-center justify-center h-full w-[80%]">
          <div className="w-4/12 flex flex-col flex-center ">
            <img src={workerImage} alt="logo" className="invert w-36" />
            <p className=" text-white mt-2 text-5xl font-bold">55</p>
            <p className=" text-white  text-2xl font-medium">
              Service Providers
            </p>
          </div>
          <div className="w-4/12 flex flex-col flex-center ">
            <img src={customerImage} alt="logo" className="invert w-36" />
            <p className=" text-white mt-2 text-5xl font-bold">55</p>
            <p className=" text-white  text-2xl font-medium">Consumers</p>
          </div>
          <div className="w-4/12 flex flex-col flex-center ">
            <img src={reviewImage} alt="logo" className="invert w-36 p-4" />
            <p className=" text-white mt-2 text-5xl font-bold">Thousands</p>
            <p className=" text-white  text-2xl font-medium">of Reviews</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
