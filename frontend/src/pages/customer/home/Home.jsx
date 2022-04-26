import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Nav from "../../../components/Nav";
import AOS from "aos";
import "aos/dist/aos.css";
import "./home.css";
import Typewriter from "typewriter-effect";

import { getCustomers } from "../../../api/customer";
import { getStats } from "../../../api/serviceProvider";
import { getAllReviews } from "../../../api/review";

import homeBackImage from "../../../assets/images/home-back.jpg";
import reviewImage from "../../../assets/icons/reviews.png";
import workerImage from "../../../assets/icons/workers.png";
import customerImage from "../../../assets/icons/team.png";

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
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceProviderCount, setServiceProviderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    getCustomers()
      .then((res) => {
        setCustomerCount(res.count);
      })
      .catch((err) => console.log("No Customers"));
    getStats()
      .then((res) => {
        setServiceProviderCount(res?.data?.totalServiceProviders);
      })
      .catch((err) => console.log("No Service Providers"));
    getAllReviews()
      .then((res) => {
        setReviewCount(res.count);
      })
      .catch((err) => console.log("No Reviews"));

    AOS.init({ duration: 2500 });
    var Tawk_API = Tawk_API || {};
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

      {/* <h1
            className="sm:text-5xl text-4xl  font-bold text-gray-800 mb-8 tracking-wide lg:w-[710px]  w-[90%]  "
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
          </form> */}
      <div
        className="w-screen h-screen flex flex-col justify-center lg:items-start items-center pb-16 lg:pl-28 bg-[#ffcd57e5]
      "
      >
        <div className="md:px-8 px-4 md:py-20 py-8 mx-6 bg-white/40 rounded-xl mt-10">
          <h1
            className="sm:text-5xl text-4xl  font-bold text-gray-800 mb-8 tracking-wide lg:w-[710px]  w-[90%]  "
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
            className="mt-3 w-full  md:hidden flex flex-col gap-4  "
            data-aos="fade-in"
            action="search"
            onSubmit={(e) => {
              setSubmited(true);
            }}
          >
            <div className="flex items-center w-full  py-2   rounded border-2 shadow-md bg-white">
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
            <div className="flex items-center w-full  py-2   rounded border-2 shadow-md bg-white">
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
          <Link to="/search?service=contractor">
            <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400 cursor-pointer mx-12 my-6">
              <div className="h-32 w-32 rounded-full  bg-[#77DF40] flex flex-center shadow-md ">
                <BiBuildingHouse className="text-6xl text-white " />
              </div>
              <p className="mt-2 text-lg font-medium text-gray-600">
                Contractor
              </p>
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
      <div className="py-14 w-screen bg-black/40 flex flex-center ">
        <div className="flex sm:flex-row flex-col items-center sm:justify-center  h-full md:w-[80%] w-[95%] sm:gap-0 gap-4">
          <div className="sm:w-4/12 flex sm:flex-col sm:flex-center gap-4 items-center justify-center">
            <img src={workerImage} alt="logo" className="invert md:w-36 w-20" />
            <div className="flex flex-col flex-center">
              <p className=" text-white sm:mt-2 md:text-5xl text-3xl font-bold">
                {serviceProviderCount}
              </p>
              <p className=" text-white  md:text-2xl text-xl font-medium text-center">
                Service Providers
              </p>
            </div>
          </div>
          <div className="sm:w-4/12 flex sm:flex-col sm:flex-center gap-4 items-center justify-center ">
            <img
              src={customerImage}
              alt="logo"
              className="invert md:w-36 w-20"
            />
            <div className="flex flex-col flex-center">
              <p className=" text-white mt-2 md:text-5xl text-3xl font-bold">
                {customerCount}
              </p>
              <p className=" text-white  md:text-2xl text-xl font-medium">
                Consumers
              </p>
            </div>
          </div>
          <div className="sm:w-4/12 flex sm:flex-col sm:flex-center gap-4 items-center justify-center ">
            <img
              src={reviewImage}
              alt="logo"
              className="invert md:w-36 w-20 p-4"
            />
            <div className="flex flex-col flex-center">
              <p className=" text-white mt-2 md:text-5xl text-3xl font-bold">
                {reviewCount}
              </p>
              <p className=" text-white  md:text-2xl text-xl font-medium">
                Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-48 py-12 text-center bg-primary/95 text-white flex flex-center flex-col z-50  px-2">
        <h2 className="text-2xl">
          Make Better Hiring Descision with Ghar Sewa
        </h2>
        <p className="mt-4 text-gray-300">
          Ghar Sewa is one stop solution for all your home service needs. We are
          here to help you find the best service provider for your repair and
          maintenance work.
        </p>
        <Link to="/search">
          <button className="px-4 py-2 bg-stone-400 rounded-md mt-4 hover:bg-neutral-800">
            View Service Providers
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
