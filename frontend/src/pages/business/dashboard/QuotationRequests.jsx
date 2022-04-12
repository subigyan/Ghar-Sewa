import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/business/Sidebar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProvider } from "../../../api/serviceProviderSearch";
import { searchQuotation, addQuote } from "../../../api/quotation";
import { Avatar, Modal, TextField } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import { toast } from "react-toastify";

const QuotationRequests = () => {
  const user = useRecoilValue(serviceProviderAuthState);
  const [serviceProvider, setServiceProvider] = useState({}); // get service provider details

  const [quotationRequests, setQuotationRequests] = useState([]); // get quotation requests

  const [serviceOptions, setServiceOptions] = React.useState("");
  const [userServices, setUserServices] = React.useState([]);

  const [currentCustomer, setCurrentCustomer] = useState("");

  const [quoteId, setQuoteId] = useState("");

  const [quote, setQuote] = useState("");

  console.log(quoteId);

  const handleChange = (event) => {
    setServiceOptions(event.target.value);
    searchQuotation(event.target.value)
      .then((res) => {
        setQuotationRequests(res.data);
      })
      .catch((err) => console.log("No Quotation Requests"));
  };

  useEffect(() => {
    getServiceProvider(user?.id)
      .then((res) => {
        setServiceProvider(res.data);
        setUserServices(res.data?.services);
        setServiceOptions(res.data?.services?.[0]);
        searchQuotation(res.data?.services?.[0])
          .then((res) => {
            setQuotationRequests(res.data);
          })
          .catch((err) => console.log("No Quotation Requests"));
      })
      .catch((err) => console.log("User Not Found"));
  }, [user.id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const addServiceQuote = () => {
    addQuote({ id: quoteId, serviceProvider: user?.id, quote })
      .then((res) => {
        setOpen(false);
        setQuote("");
        setQuoteId("");
        console.log(res);
        toast.success("Quotation Posted");
      })
      .catch((err) => console.log("Error Adding Quote"));
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"requests"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins ">
        <h1 className="text-3xl font-semibold">Quotation Requests</h1>

        <div className="w-full flex justify-end">
          <FormControl className="w-36">
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              value={serviceOptions}
              onChange={handleChange}
              defaultValue={10}
              label={"10"}
            >
              {userServices?.map((service) => {
                return (
                  <MenuItem value={service} className="capitalize">
                    {service}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="mt-4 flex flex-col gap-6">
          {quotationRequests.map((quotation) => {
            return (
              <div className="border-2 p-4 rounded-md shadow-md">
                <div className="flex justify-between flex-wrap">
                  <div className="">
                    <div className="flex items-center">
                      <Avatar sx={{ width: 30, height: 30 }}>
                        {quotation?.customer?.name[0]}
                      </Avatar>
                      <div className="ml-3">
                        <p className=" text-slate-500 font-semibold">
                          {quotation?.customer?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-lg font-semibold">
                    {quotation?.requestHeadline}
                  </h2>
                  <p className="mt-2"> {quotation?.requestBody}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className=" bg-indigo-900 px-4 py-4 text-white rounded-md"
                    onClick={() => {
                      handleOpen();
                      setCurrentCustomer(quotation?.customer?.name);
                      setQuoteId(quotation?._id);
                    }}
                  >
                    Provide a Quotation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <form
          className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[70%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            addServiceQuote();
          }}
        >
          <AiFillCloseSquare
            className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
            onClick={handleClose}
          />
          <h1 className=" text-3xl font-semibold mr-6">
            Quotation for {currentCustomer}
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

export default QuotationRequests;
