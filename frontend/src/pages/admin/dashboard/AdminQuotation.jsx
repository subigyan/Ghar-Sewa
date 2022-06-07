import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  editServiceProviderQuote,
  deleteServiceProviderQuote,
  getAllQuotations,
  deleteQuotation,
} from "../../../api/quotation";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import Sidebar from "../../../components/admin/Sidebar";

const AdminQuotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [sort, setSort] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    getAllQuotations(text, sort)
      .then((res) => {
        setQuotations(res.data);
      })
      .catch((err) => console.log("No Quotations"));
  }, [text, sort]);

  console.log(quotations);

  const deleteSPQuote = (id) => {
    deleteServiceProviderQuote(id)
      .then((res) => {
        getAllQuotations()
          .then((res) => {
            setQuotations(res.data);
          })
          .catch((err) => console.log("No Quotations"));
        toast.success("Quote Deleted", {
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Quote Not Deleted", {
          theme: "dark",
        });
      });
  };

  const handleChange = (event) => {
    setSort(event.target.value);
    getAllQuotations(text, event.target.value)
      .then((res) => {
        setQuotations(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  // const getQuotationByText = (event) => {
  //   setText(event.target.value);
  //   getAllQuotations(event.target.value, sort)
  //     .then((res) => {
  //       setQuotations(res.data);
  //     })
  //     .catch((err) => console.log("No Service Providers"));
  // };

  const deleteQuotationRequest = (id) => {
    deleteQuotation(id)
      .then((res) => {
        getAllQuotations()
          .then((res) => {
            setQuotations(res.data);
          })
          .catch((err) => console.log(err));
        toast.success("Quotation Request Deleted", {
          theme: "dark",
        });
      })
      .catch((err) =>
        toast.error(`Error: ${err?.response?.data?.message}`, {
          theme: "dark",
        })
      );
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"quotations"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins ">
        <h1 className="text-3xl font-semibold">Quotations</h1>
        <div className="flex justify-between mt-6">
          <input
            type={"text"}
            className="w-60 border-2 border-gray-300 rounded-lg p-2"
            placeholder="Search by text "
            onChange={(event) => {
              setText(event.target.value);
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
        <div className="mt-4 flex flex-col gap-4">
          {quotations.length === 0 ? (
            <div className="flex justify-center">
              <h1 className="text-5xl font-semibold font-smooch text-gray-600 capitalize">
                No Quotation Requests
              </h1>
            </div>
          ) : (
            ""
          )}
          {quotations.map(
            (quotation, index) =>
              quotation.customer && (
                <div
                  className="border-2 rounded-md shadow-md px-8 py-6"
                  key={index}
                >
                  {console.log(quotations)}
                  <div className="flex justify-between flex-wrap">
                    <div className="w-full">
                      <div className="flex items-center">
                        <div className=" w-full flex justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                              <p className="font-semibold capitalize text-xl">
                                Request From: {quotation?.customer?.name}
                              </p>
                              <p className="font-medium capitalize text-sm  text-slate-500">
                                To: {quotation?.service}s
                              </p>
                            </div>
                            <p className=" font-semibold capitalize text-xl">
                              Title: {quotation?.requestHeadline}
                            </p>
                          </div>
                          <p className="font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500  text-right">
                            {new Date(quotation?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-slate-700">
                    <p className="mt-2">{quotation?.requestBody}</p>
                  </div>
                  <div className="flex justify-end">
                    <MdDelete
                      className="text-3xl text-red-600 ml-2 cursor-pointer"
                      onClick={() => {
                        deleteQuotationRequest(quotation?._id);
                      }}
                    />
                  </div>

                  {/* <div className="flex  font-semibold justify-end">
                  <BiEdit
                    className="text-3xl text-green-600 cursor-pointer"
                    onClick={() => {
                      setUpdateQHeadline(quotation?.requestHeadline);
                      setUpdateQBody(quotation?.requestBody);
                      setQuotationID(quotation?._id);
                      setUpdateQService(quotation?.service);
                      handleUpdateOpen();
                    }}
                  />
                  <MdDeleteOutline
                    className="text-3xl text-red-600 ml-2 cursor-pointer"
                    onClick={() => {
                      deleteQuotationRequest(quotation?._id);
                    }}
                  />
                </div> */}

                  <div className="border-t-2 mt-5 py-2">
                    <p className="text-lg font-medium text-slate-700">
                      Received Quotations:
                    </p>
                    {quotation?.quotations.map((receivedQuotes, index) => (
                      <div
                        className="ml-4 mt-4 flex flex-col gap-4"
                        key={index}
                      >
                        <div className="border-x-4 border-x-neutral-500 border-2 px-4 py-4">
                          <div className="flex font-medium items-center text-lg">
                            <Avatar size="small" sx={{ width: 25, height: 25 }}>
                              {receivedQuotes?.serviceProvider?.name?.[0].toUpperCase()}
                            </Avatar>
                            <p className="ml-2 capitalize">
                              {receivedQuotes?.serviceProvider?.name}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p>{receivedQuotes?.quote}</p>
                          </div>
                          <div className="flex  font-semibold justify-end">
                            <MdDeleteOutline
                              className="text-3xl text-red-600 ml-2 cursor-pointer"
                              onClick={() => {
                                deleteSPQuote(receivedQuotes?._id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuotation;
