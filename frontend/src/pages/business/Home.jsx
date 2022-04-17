import React, { useEffect } from "react";
import AOS from "aos";
import {
  BsChevronCompactDown,
  BsArrowRightSquare,
  BsTagsFill,
} from "react-icons/bs";

import Nav from "../../components/business/Nav";

import { AiFillSetting } from "react-icons/ai";

import snapIcon from "../../assets/icons/snap.png";

import img from "../../assets/images/business.png";
import growth from "../../assets/images/growth.png";
import review from "../../assets/images/review.png";
import dash from "../../assets/images/businessDash.png";

import useDeviceProvider from "../../hooks/useDeviceProvider";

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);
  const [, isTab] = useDeviceProvider();

  return (
    <div className="flex flex-center flex-col ">
      <Nav />
      <div className="flex w-full relative">
        <div
          className={`${
            isTab ? " w-0" : "w-1/2"
          } bg-[#1e1f4f] h-[80vh] flex flex-center font-roboto`}
        >
          <div
            className={`bg-white rounded-xl h-[60%] lg:w-[70%] w-[85%] py-4 px-6 flex flex-col justify-around items-start   ${
              isTab &&
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            }`}
          >
            <h1 className="text-4xl font-medium">Grow Your Business</h1>
            <p className="text-justify">
              Maximize your business opportunities by increasing your exposure
              to thousands of home owner seeking to find local service providers
              just like you.
            </p>
            <p>Signing up is easy and free. Start today! </p>
            <Link to="/business/register">
              <button className="font-semibold py-2 px-6    bg-indigo-700 text-gray-200 rounded-lg">
                List my Business
              </button>
            </Link>
            <p>
              Already have an account?
              <Link to="/business/login">
                <span className="underline ml-2 cursor-pointer">
                  Go to Dashboard
                  <BsArrowRightSquare className="inline-block ml-1" />
                </span>
              </Link>
            </p>
          </div>
        </div>
        {/* <div className="w-1/2 bg-indigo-900 h-[80vh]"></div> */}
        <img
          src={img}
          className={` ${isTab ? "w-full" : "w-1/2"}  object-cover h-[80vh]`}
          alt="img"
        />
      </div>
      <div className="flex flex-col flex-center py-4">
        <h2 className="text-xl font-medium text-center px-4">
          Use{" "}
          <span className="text-indigo-800 font-semibold">
            Ghar Sewa for Business{" "}
          </span>{" "}
          to take your business to a new level.
        </h2>

        <a href="#features">
          <BsChevronCompactDown className="text-4xl animate-bounce cursor-pointer" />
        </a>
      </div>
      <div
        className="flex flex-center py-4 w-full justify-evenly"
        id="features"
      >
        <div className="flex flex-col items-center w-44">
          <div className="h-20 w-20 rounded-full bg-indigo-600 flex flex-center">
            <BsTagsFill className="text-4xl text-white" />
          </div>
          <h3 className="text-xl font-medium mt-1">Free</h3>
        </div>
        <div className="flex flex-col items-center w-44">
          <div className="h-20 w-20 rounded-full bg-yellow-400 flex flex-center">
            <img
              src={snapIcon}
              style={{
                filter: "invert(1)",
              }}
              alt="snap icon"
            />
          </div>
          <h3 className="text-xl font-medium mt-1">Easy</h3>
        </div>
        <div className="flex flex-col items-center w-44">
          <div className="h-20 w-20 rounded-full bg-green-500 flex flex-center">
            <AiFillSetting className="text-4xl text-white" />
          </div>
          <h3 className="text-xl font-medium mt-1">Personalizable</h3>
        </div>
      </div>
      <div className="my-4 flex  flex-col flex-center">
        <h1 className="text-3xl font-semibold text-center my-6" id="standOut">
          Stand Out. Attract Customer. Build Trust. Grow.
        </h1>
        <div className="lg:w-[75%] w-[90%]  flex flex-center sm:flex-row flex-col">
          <div
            className="w-1/2 my-4  min-w-[340px] p-2 "
            data-aos="zoom-in-right"
          >
            <h1 className="my-4 font-semibold text-2xl capitalize">
              Make your business stand out
            </h1>
            <p>
              Ghar Sewa helps you increase your brand visibility and make it
              easy for customers to do business with you. Have a strong online
              presence on Ghar Sewa to establish trust with potential customers.
            </p>
            <ul className="px-4 list-disc mt-2">
              <li>
                Update your business info so customers can get in touch with you
              </li>
              <li>
                Showcase your work and prove that you are the right business for
                the job.
              </li>
            </ul>
          </div>
          <div className="w-1/2  flex flex-center h-60" data-aos="zoom-in-left">
            <img
              src={growth}
              alt="business"
              className="w-[70%] min-w-[300px]"
            />
          </div>
        </div>
        <div className="lg:w-[75%] w-[90%]  flex flex-center sm:flex-row flex-col-reverse ">
          <div
            className="w-1/2  flex sm:justify-start justify-center h-80 "
            data-aos="zoom-in-right"
          >
            <img
              src={review}
              alt="business"
              className="w-[70%] object-contain  min-w-[300px]"
            />
          </div>
          <div
            className="w-1/2 my-4  min-w-[340px] p-2"
            data-aos="zoom-in-left"
          >
            <h1 className="my-4 font-semibold text-2xl capitalize ">
              Build Business Reputation
            </h1>
            <p>
              Customers look for reviews before selecting a business or
              individual for household repair and maintenance. Provide quality
              home service to the customer and receive ratings and reviews from
              them establish credibility and built a positive reputation for
              your business.
            </p>
          </div>
        </div>
        <div className="lg:w-[75%] w-[90%]  flex flex-center sm:flex-row flex-col">
          <div
            className="w-1/2 my-6  min-w-[340px] p-2 "
            data-aos="zoom-in-right"
          >
            <h1 className="my-4 font-semibold text-2xl capitalize">
              Monitor Your Growth
            </h1>
            <p>
              Use the dashboard provided by Ghar Sewa to get your page metrics
              like review count, overall rating etc. Respond to the quotation
              request from the customers using the dashboard to demonstrate that
              you are the best option for their hous ehold repair and
              maintenance issues.
            </p>
          </div>
          <div className="w-1/2  flex flex-center h-60" data-aos="zoom-in-left">
            <img src={dash} alt="business" className="w-[70%] min-w-[300px]" />
          </div>
        </div>
      </div>
      <div className="w-full min-h-48 py-8 text-center bg-[#1e1f4f] text-white flex flex-center flex-col z-50 mt-8 px-2">
        <h2 className="text-2xl">Seize the opportunity waiting for you</h2>
        <p className="mt-4 text-gray-300">
          Revolutionize the way you do business with Ghar Sewa. It's free, easy,
          and only takes a few minutes.
        </p>
        <Link to="/business/register">
          <button className="px-4 py-2 bg-slate-400 rounded-md mt-4 hover:bg-indigo-700">
            Get Started
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
