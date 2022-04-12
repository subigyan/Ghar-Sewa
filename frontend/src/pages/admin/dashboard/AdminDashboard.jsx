import React from "react";
import Sidebar from "../../../components/admin/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"viewInfo"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Customers</h1>
        <div className="w-full flex flex-col gap-8 py-8 "></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
