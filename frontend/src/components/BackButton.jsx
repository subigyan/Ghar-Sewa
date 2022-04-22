import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const BackButton = ({ home }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-6 left-8 bg-white shadow-sm shadow-slate-500 p-2 rounded-full cursor-pointer"
      onClick={() => {
        if (home) {
          navigate("/business");
        } else {
          navigate(-1);
        }
      }}
    >
      <IoArrowBack className="text-3xl text-slate-800" />
    </div>
  );
};

BackButton.defaultProps = {
  home: false,
};

export default BackButton;
