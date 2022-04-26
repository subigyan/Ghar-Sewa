import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { getCustomers, deleteCustomer } from "../../../api/customer";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  const [sort, setSort] = useState("");
  const [name, setName] = useState("");

  const getCustomersByName = (name) => {
    getCustomers(name, sort)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log("No Customers"));
  };

  const handleChange = (event) => {
    setSort(event.target.value);
    getCustomers(name, event.target.value)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const [pageNumber, setPageNumber] = useState(1);

  const usersPerPage = 8;
  const pagesVisited = (pageNumber - 1) * usersPerPage;

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"customer"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Customers</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          <div className="w-10/12 min-w-[800px]">
            <div className="flex justify-between ">
              <input
                type={"text"}
                className="w-60 border-2 border-gray-300 rounded-lg p-2"
                placeholder="Search by name"
                onChange={(e) => {
                  getCustomersByName(e.target.value);
                  setName(e.target.value);
                  setPageNumber(1);
                }}
              />
              <FormControl className="w-44">
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort"
                  onChange={handleChange}
                  defaultValue={""}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"old"}>Oldest</MenuItem>
                  <MenuItem value={"new"}>Newest</MenuItem>
                </Select>
              </FormControl>
            </div>
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
                  {customers
                    ?.slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((customer, index) => (
                      <tr
                        className="bg-white border-b text-gray-800 hover:bg-gray-50"
                        key={index}
                      >
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

              {customers.length > 0 && (
                <div className="my-8 flex flex-center ">
                  <Stack spacing={2}>
                    <Pagination
                      count={
                        customers.length > 0
                          ? Math.ceil(customers.length / 8)
                          : 1
                      }
                      variant="outlined"
                      color="primary"
                      page={pageNumber}
                      onChange={(e, val) => {
                        setPageNumber(val);
                      }}
                    />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
