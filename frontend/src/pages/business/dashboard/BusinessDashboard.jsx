import React, { useState } from "react";

import Sidebar from "../../../components/business/Sidebar";

const BusinessDashboard = () => {
  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"dashboard"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins "></div>
    </div>
  );
};

export default BusinessDashboard;
