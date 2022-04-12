import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { getCustomers, deleteCustomer } from "../../../api/customer";
import { toast } from "react-toastify";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log("No Customers"));
  }, []);

  const deleteCustomerInfo = (id) => {
    deleteCustomer(id)
      .then((res) => {
        getCustomers()
          .then((res) => {
            setCustomers(res.data);
          })
          .catch((err) => console.log("No Customers"));
        toast.success("Customer Deleted Successfully", {
          theme: "dark",
        });
      })
      .catch((err) => console.log("No Customers"));
  };

  const getCustomersByName = (name) => {
    getCustomers(name)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log("No Customers"));
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"customer"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Customers</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          <div className="w-10/12 min-w-[800px]">
            <input
              type={"text"}
              className="w-60 border-2 border-gray-300 rounded-lg p-2"
              placeholder="Search by name"
              onChange={(e) => getCustomersByName(e.target.value)}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                  <tr className="text-base">
                    <th scope="col" className="px-6 py-5">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers?.map((customer, index) => (
                    <tr className="bg-white border-b text-gray-800 hover:bg-gray-50">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 "
                      >
                        {customer.name}
                      </th>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">
                        {new Date(customer?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className="font-medium text-red-600 cursor-pointer  hover:underline"
                          onClick={() => deleteCustomerInfo(customer._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
