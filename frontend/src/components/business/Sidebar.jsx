import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import {
  BsPersonSquare,
  BsChatSquareQuote,
  BsChatRightText,
  BsImages,
} from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { VscPreview } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { RiQuestionnaireLine } from "react-icons/ri";
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
          <Link to="/business/dashboard">
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
          <div>
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500"
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            >
              <div className="flex items-center">
                <BsPersonSquare className="text-xl" />
                <h2 className="text-xl ml-3">Business Info</h2>
              </div>
              <FiChevronDown
                className={`text-2xl ease-in duration-200 ${
                  showInfo ? "rotate-180" : ""
                } `}
              />
            </div>
            {showInfo && (
              <div className="ml-8 flex flex-col gap-1 pt-1">
                <Link to="/business/dashboard/view-info">
                  <div
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                      active === "viewInfo" && "bg-[#8B8D93]/[.5]"
                    }`}
                  >
                    <VscPreview className="text-xl" />
                    <h2 className="text-xl ml-3">View Info</h2>
                  </div>
                </Link>
                <Link to="/business/dashboard/manage-info">
                  <div
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                      active === "manageInfo" && "bg-[#8B8D93]/[.5]"
                    }`}
                  >
                    <BiEdit className="text-xl" />
                    <h2 className="text-xl ml-3">Manage Info</h2>
                  </div>
                </Link>
                <Link to="/business/dashboard/manage-images">
                  <div
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                      active === "image" && "bg-[#8B8D93]/[.5]"
                    }`}
                  >
                    <BsImages className="text-xl" />
                    <h2 className="text-xl ml-3">Manage Images</h2>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-gray-800  rounded-lg "></div>
          <Link to="/business/dashboard/reviews">
            <div
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                active === "reviews" && "bg-[#8B8D93]/[.5]"
              }`}
            >
              <MdOutlineRateReview className="text-xl" />
              <h2 className="text-xl ml-3">Reviews</h2>
            </div>
          </Link>
          <div className="border-t border-gray-800  rounded-lg "></div>

          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500"
            onClick={() => {
              setShowQuotation(!showQuotation);
            }}
          >
            <div className="flex items-center">
              <BsChatSquareQuote className="text-xl" />
              <h2 className="text-xl ml-3">Quotations</h2>
            </div>
            <FiChevronDown
              className={`text-2xl ease-in duration-200 ${
                showQuotation ? "rotate-180" : ""
              } `}
            />
          </div>
          {showQuotation && (
            <div>
              <div className="ml-8 flex flex-col gap-1 pt-1">
                <Link to="/business/dashboard/requests">
                  <div
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                      active === "requests" && "bg-[#8B8D93]/[.5]"
                    }`}
                  >
                    <RiQuestionnaireLine className="text-xl" />
                    <h2 className="text-xl ml-3">Requests</h2>
                  </div>
                </Link>
                <Link to="/business/dashboard/quotations">
                  <div
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-[#8B8D93]/[.5]  rounded-lg transition-all duration-500 ${
                      active === "myQuotations" && "bg-[#8B8D93]/[.5]"
                    }`}
                  >
                    <BsChatRightText className="text-xl" />
                    <h2 className="text-xl ml-3">My Quotations</h2>
                  </div>
                </Link>
              </div>
            </div>
          )}
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
