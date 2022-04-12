import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";

import { MdOutlineRateReview, MdOutlinePeopleAlt } from "react-icons/md";

import { CgToolbox } from "react-icons/cg";

import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ active }) => {
  const [showInfo, setShowInfo] = useState(
    active === "viewInfo" || active === "manageInfo" || active === "image"
  );
  const [showQuotation, setShowQuotation] = useState(
    active === "requests" || active === "myQuotations"
  );

  return (
    <div className="min-w-[325px] h-screen bg-admin_dark text-admin_light py-6 px-8 overflow-y-scroll scrollbar-hide flex flex-col justify-between  ">
      <div>
        <h1 className="text-5xl text-center font-semibold font-smooch ">
          Ghar Sewa
        </h1>
        <div className="border-t-2 border-gray-700  rounded-lg my-6"></div>
        <p className="text-gray-600 font-semibold text-sm">MENU</p>
        <div className="flex flex-col gap-3 mt-4">
          <Link to="/admin/dashboard">
            <div
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                active === "dashboard" && "bg-[#8B8D93]/[.5]"
              }`}
            >
              <RiDashboardLine className="text-xl" />
              <h2 className="text-xl ml-3">Dashboard</h2>
            </div>
          </Link>
          <div className="border-t border-gray-800  rounded-lg "></div>

          <Link to="/admin/dashboard/customers">
            <div
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                active === "customer" && "bg-[#8B8D93]/[.5]"
              }`}
            >
              <MdOutlinePeopleAlt className="text-xl" />
              <h2 className="text-xl ml-3">Customers</h2>
            </div>
          </Link>
          <div className="border-t border-gray-800  rounded-lg "></div>
          <Link to="/admin/dashboard/serviceProviders">
            <div
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                active === "serviceProvider" && "bg-[#8B8D93]/[.5]"
              }`}
            >
              <CgToolbox className="text-xl" />
              <h2 className="text-xl ml-3">Service Providers</h2>
            </div>
          </Link>
          <div className="border-t border-gray-800  rounded-lg "></div>
          <Link to="/admin/dashboard/reviews">
            <div
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                active === "reviews" && "bg-[#8B8D93]/[.5]"
              }`}
            >
              <MdOutlineRateReview className="text-xl" />
              <h2 className="text-xl ml-3">Reviews</h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex p-3 mx-3 items-center rounded-lg bg-[#353637] hover:text-red-500 cursor-pointer mt-4">
        <FiLogOut className="text-2xl cursor-pointer" />
        <p className="text-lg font-semibold ml-2 ">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
