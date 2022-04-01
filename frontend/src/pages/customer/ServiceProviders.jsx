import React from "react";
import Nav from "../../components/Nav";
import Rating from "@mui/material/Rating";
import { GrLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";

const ServiceProviders = () => {
  return (
    <>
      <Nav />
      <div className="w-screen flex mt-28 lg:px-14 px-7 font-roboto md:flex-row flex-col">
        <div className="md:w-3/12 w-full min-w-[250px]  bg-green-300">
          Filter
        </div>
        <div className="md:w-9/12 w-full ">
          <div className="flex  justify-between py-5 lg:px-15 md:px-10 px-5">
            <h1 className="text-3xl font-semibold">Service Providers</h1>
            <p>Sort</p>
          </div>
          <div className="bg-slate-100 min-h-[500px] flex flex-col ] py-5 lg:px-15 md:px-10 sm:px-5">
            <div className="min-h-52 w-full bg-white rounded-lg  flex sm:flex-row   flex-col p-6 shadow-lg border border-gray-200 hover:scale-[1.005] hover:shadow-xl transition-all duration-200 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  src="https://picsum.photos/200"
                  alt="service provider"
                  className="sm:w-44 w-full sm:h-auto h-44 object-center  sm:min-w-[8rem]   rounded-md "
                />
                {/* <div className="sm:hidden text-righ">
                  <div className=" flex h-min items-center ">
                    <GrLocation className="text-gray-600 text-xl " />
                    <p className="ml-2">Sinamangal, Kathmandu</p>
                  </div>
                  <div className=" flex h-min items-center ">
                    <FiPhoneCall className="text-gray-600 text-xl " />
                    <p className="ml-2">98418012345</p>
                  </div>
                </div> */}
              </div>

              <div className="w-full  sm:mt-0 mt-4 sm:pl-6 ">
                <div className="flex justify-between flex-wrap">
                  <div>
                    <p className="text-2xl font-medium">Subi Plumbing</p>
                    <Rating
                      name="read-only"
                      value={4.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="text-right flex-col space-y-1 ">
                    <div className=" flex h-min items-center ">
                      <GrLocation className="text-gray-600 text-xl " />
                      <p className="ml-2">Sinamangal, Kathmandu</p>
                    </div>
                    <div className=" flex h-min items-center ">
                      <FiPhoneCall className="text-gray-600 text-xl " />
                      <p className="ml-2">98418012345</p>
                    </div>
                  </div>
                </div>
                <div className="w-8/12 mt-2 flex gap-2">
                  <p className="text-gray-700 text-sm border py-1 px-2 rounded-lg border-gray-300 shadow-md">
                    Plumbing
                  </p>
                  <p className="text-gray-700 text-sm border py-1 px-2 rounded-lg border-gray-300 shadow-md">
                    Electician
                  </p>
                  <p className="text-gray-700 text-sm border py-1 px-2 rounded-lg border-gray-300 shadow-md">
                    Handyman
                  </p>
                </div>
                <p className="mt-4 line-clamp-2">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Accusantium aspernatur esse iste dolore, a minima quas libero
                  illo ab quos voluptate delectus natus mollitia quis soluta
                  dicta consectetur odit exercitationem! Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Odio eligendi neque vero
                  blanditiis non pariatur quos, rerum obcaecati minima atque
                  asperiores aliquam dignissimos consectetur veniam dolorum
                  culpa aliquid nostrum deserunt. Et earum tempore impedit
                  labore, commodi minima ipsam nisi alias aliquid quae,
                  explicabo tenetur dicta, dolore ratione voluptas? Non, nemo.
                  Consectetur sequi dignissimos maiores, modi ab dolores soluta
                  officia aliquid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProviders;
