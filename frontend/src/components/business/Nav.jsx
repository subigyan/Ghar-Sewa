import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ isHome }) => {
  return (
    <div className=" w-full  top-0 left-0 bg-gray-100 z-50">
      <div
        className={`flex items-center ${
          isHome ? "justify-between" : "justify-center"
        }  py-4 lg:px-14 px-7`}
      >
        <Link to="/business">
          <div
            className="font-bold text-2xl cursor-pointer flex items-end  
                    text-gray-800"
          >
            Ghar Sewa
            <span className="font-light text-base ml-2"> for business</span>
          </div>
        </Link>

        {isHome && (
          <button
            className={`lg:ml-8 lg:my-0 my-2 font-semibold py-2 px-6 shadow shadow-purple-700
           hover:scale-105 transition ease-in duration-100
        `}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

Nav.defaultProps = {
  isHome: true,
};
export default Nav;
