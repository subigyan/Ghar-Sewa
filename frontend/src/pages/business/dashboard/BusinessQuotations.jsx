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
import Sidebar from "../../../components/business/Sidebar";
import {
  getServiceProviderQuotes,
  editServiceProviderQuote,
  deleteServiceProviderQuote,
} from "../../../api/quotation";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";

const BusinessQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const user = useRecoilValue(serviceProviderAuthState);

  useEffect(() => {
    getServiceProviderQuotes(user?.id)
      .then((res) => {
        setQuotations(res.data);
      })
      .catch((err) => console.log("No Quotations"));
  }, [user.id]);

  console.log(quotations);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [currentCustomer, setCurrentCustomer] = useState("");

  const [quoteId, setQuoteId] = useState("");

  const [quote, setQuote] = useState("");

  const editSPQuote = () => {
    editServiceProviderQuote(quoteId, quote)
      .then((res) => {
        getServiceProviderQuotes(user?.id)
          .then((res) => {
            setQuotations(res.data);
          })
          .catch((err) => console.log("No Quotations"));
        handleClose();
        toast.success("Quote Updated");
      })
      .catch((err) => {
        toast.error("Quote Not Updated");
      });
  };

  const deleteSPQuote = (id) => {
    deleteServiceProviderQuote(id)
      .then((res) => {
        getServiceProviderQuotes(user?.id)
          .then((res) => {
            setQuotations(res.data);
          })
          .catch((err) => console.log("No Quotations"));
        toast.success("Quote Deleted");
      })
      .catch((err) => {
        toast.error("Quote Not Deleted");
      });
  };

  const [sort, setSort] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    getServiceProviderQuotes(user?.id, text, event.target.value)
      .then((res) => {
        setQuotations(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const getQuotationByText = (event) => {
    setText(event.target.value);
    getServiceProviderQuotes(user?.id, event.target.value, sort)
      .then((res) => {
        setQuotations(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"myQuotations"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins ">
        <h1 className="text-3xl font-semibold">Quotations</h1>
        <div className="flex justify-between mt-6">
          <input
            type={"text"}
            className="w-60 border-2 border-gray-300 rounded-lg p-2"
            placeholder="Search by text"
            onChange={getQuotationByText}
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
                You haven't made any quotations yet
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
                      My Quotations:
                    </p>
                    {quotation?.quotations.map(
                      (receivedQuotes, index) =>
                        receivedQuotes.serviceProvider === user?.id && (
                          <div className="ml-4 mt-4 flex flex-col gap-4">
                            <div className="border-x-4 border-x-neutral-500 border-2 px-4 py-4">
                              <div>
                                <p>{receivedQuotes?.quote}</p>
                              </div>
                              <div className="flex  font-semibold justify-end">
                                <BiEdit
                                  className="text-3xl text-green-600 cursor-pointer"
                                  onClick={() => {
                                    handleOpen();
                                    setCurrentCustomer(
                                      quotation?.customer?.name
                                    );
                                    setQuoteId(receivedQuotes?._id);
                                    setQuote(receivedQuotes?.quote);
                                  }}
                                />
                                <MdDeleteOutline
                                  className="text-3xl text-red-600 ml-2 cursor-pointer"
                                  onClick={() => {
                                    deleteSPQuote(receivedQuotes?._id);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <form
          className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[70%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            editSPQuote();
          }}
        >
          <AiFillCloseSquare
            className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
            onClick={handleClose}
          />
          <h1 className=" text-3xl font-semibold mr-6">
            Edit Quotation for {currentCustomer}
          </h1>
          <div className="mt-8 w-full">
            <TextField
              label="Quotation"
              id="outlined-size-normal"
              color="grey"
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              rows={10}
              multiline
              fullWidth
              required
              value={quote}
              onChange={(event) => {
                setQuote(event.target.value);
              }}
            />
          </div>
          <button className="mt-6 py-4 bg-slate-800 text-gray-100 rounded text-xl">
            Post
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BusinessQuotations;
