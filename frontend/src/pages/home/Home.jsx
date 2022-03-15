import React, { useEffect } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Nav from "../../components/Nav";
import AOS from "aos";
import "aos/dist/aos.css";
import "./home.css";
import Typewriter from "typewriter-effect";

import { GiTap, GiElectric } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";

import { AiOutlineFormatPainter } from "react-icons/ai";
import { GiVacuumCleaner } from "react-icons/gi";
import { GiMechanicGarage } from "react-icons/gi";
import { MdHandyman } from "react-icons/md";
import { GiHandSaw } from "react-icons/gi";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex flex-col justify-center lg:items-start items-center  back px-4 pb-16 lg:pl-32 ">
        <h1
          className="text-5xl font-bold text-gray-800 mb-8 tracking-wide lg:w-[710px] w-[80%]  mt-10"
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
                .typeString("Discover Household  Service Providers Near You")
                .pauseFor(2000)

                .start();
            }}
          />
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
      <div className="border-2  py-6 ">
        <h1 className="text-3xl font-semibold text-center">Our Service</h1>
        <p className=" text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eaque
          pariatur sunt dolorum! Optio porro commodi quos tenetur! Earum,
          veritatis.
        </p>
        <div className="flex justify-around mt-10 lg:px-32">
          <div className="flex flex-col flex-center hover:scale-105 transition ease-in-out duration-400">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl relative  transition-all">
              <GiTap className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Plumber</p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiElectric className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Electircian</p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <BiBuildingHouse className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Builder</p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <AiOutlineFormatPainter className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Painter </p>
          </div>
        </div>
        <div className="flex justify-around mt-10 lg:px-32">
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiHandSaw className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Carpenter </p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiVacuumCleaner className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Cleaner </p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <GiMechanicGarage className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Mechanic </p>
          </div>
          <div className="flex flex-col flex-center">
            <div className="h-36 w-36 rounded-3xl bg-yellow-200 flex flex-center shadow-xl ">
              <MdHandyman className="text-8xl text-white " />
            </div>
            <p className="mt-3 text-xl">Handyman</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
