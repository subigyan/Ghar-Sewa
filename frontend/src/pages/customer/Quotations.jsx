import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authAtom";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineAddCircleOutline } from "react-icons/md";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  getCustomerQuotations,
  postQuotation,
  updateQuotation,
  deleteQuotation,
} from "../../api/quotation";
import { toast } from "react-toastify";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Quotations = () => {
  const [user, setUser] = useRecoilState(authState);
  const [quotations, setQuotations] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  useEffect(() => {
    if (user?.id) {
      getCustomerQuotations(user.id)
        .then((res) => {
          setQuotations(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [user?.id]);

  const [quotationService, setQuotationService] = React.useState("plumber");
  const [quotationHeadline, setQuotationHeadline] = useState("");
  const [quotationBody, setQuotationBody] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setQuotationService("plumber");
    setQuotationHeadline("");
    setQuotationBody("");
    setOpen(false);
  };

  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const [updateQHeadline, setUpdateQHeadline] = useState("");
  const [updateQBody, setUpdateQBody] = useState("");
  const [quotationID, setQuotationID] = useState("");
  const [updateQService, setUpdateQService] = React.useState("plumber");

  console.log(updateQBody);

  const addQuotation = () => {
    postQuotation({
      customer: user?.id,
      requestHeadline: quotationHeadline,
      requestBody: quotationBody,
      service: quotationService,
    })
      .then((res) => {
        handleClose();
        getCustomerQuotations(user.id)
          .then((res) => {
            setQuotations(res.data);
            setQuotationHeadline("");
            setQuotationBody("");
            setQuotationService("plumber");
          })
          .catch((err) => console.log(err));
        toast.success("Quotation Request Posted");
      })
      .catch((err) => toast.error(`Error: ${err?.response?.data?.message}`));
  };

  const updateQuotationRequest = () => {
    updateQuotation(quotationID, {
      requestHeadline: updateQHeadline,
      requestBody: updateQBody,
      service: updateQService,
    })
      .then((res) => {
        handleUpdateClose();
        getCustomerQuotations(user.id)
          .then((res) => {
            setQuotations(res.data);
            setUpdateQHeadline("");
            setUpdateQBody("");
            setUpdateQService("plumber");
          })
          .catch((err) => console.log(err));
        toast.success("Quotation Request Updated");
      })
      .catch((err) => toast.error(`Error: ${err?.response?.data?.message}`));
  };

  const deleteQuotationRequest = (id) => {
    deleteQuotation(id)
      .then((res) => {
        getCustomerQuotations(user.id)
          .then((res) => {
            setQuotations(res.data);
          })
          .catch((err) => console.log(err));
        toast.success("Quotation Request Deleted");
      })
      .catch((err) => toast.error(`Error: ${err?.response?.data?.message}`));
  };

  const serviceCategories = [
    {
      service: "Plumbing",
      occupation: "plumber",
    },
    {
      service: "Electrical Repair",
      occupation: "electrician",
    },
    {
      service: "Construction",
      occupation: "contractor",
    },
    {
      service: "Painting",
      occupation: "painter",
    },
    {
      service: "Carpenting",
      occupation: "carpenter",
    },
    {
      service: "Cleaning",
      occupation: "cleaner",
    },
    {
      service: "Auto Repair",
      occupation: "mechanic",
    },
    {
      service: "Handyman Service",
      occupation: "handyman",
    },
  ];

  console.log(quotations);

  return (
    <div>
      <Nav fixed={false} />
      <div className="lg:px-32 px-7 flex flex-col  max-w-screen  mt-8 text-slate-700 font-roboto break-words">
        <div className="flex justify-between items-center">
          <h1 className=" font-bold sm:text-5xl text-4xl">
            My Quotation Requests
          </h1>
          <MdOutlineAddCircleOutline
            className="text-5xl text-green-800 cursor-pointer"
            onClick={handleOpen}
          />
        </div>
        <div className="flex justify-between mt-6 py-2">
          <input
            type={"text"}
            className="w-60 border-2 border-gray-300 rounded-lg p-2"
            placeholder="Search by text "
          />
          <FormControl className="w-44">
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort"
              defaultValue={""}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"old"}>Oldest</MenuItem>
              <MenuItem value={"new"}>Newest</MenuItem>
            </Select>
          </FormControl>
        </div>
        {quotations.length === 0 ? (
          <div className="absolute font-smooch top-1/2 left-1/2 -translate-x-1/2 text-slate-700  ">
            <h1 className="text-5xl text-gray-500">
              No Quotation Requests Found
            </h1>
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex flex-col gap-8 py-8">
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
                          <div>
                            <p className=" font-semibold capitalize text-2xl">
                              {quotation?.requestHeadline}
                            </p>
                            <p className="font-medium capitalize  text-slate-500">
                              To: {quotation?.service}s
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
                  <div className="mt-4 text-slate-700 ">
                    <p className="mt-2">{quotation?.requestBody}</p>
                  </div>

                  <div className="flex  font-semibold justify-end">
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
                  </div>

                  <div className="border-t-2 mt-5 py-2">
                    <p className="text-lg font-medium text-slate-700">
                      Received Quotations:
                    </p>
                    {quotation?.quotations.map((quotation, index) => (
                      <div className="ml-4 mt-4 flex flex-col gap-4">
                        <div className="border-l-4 px-2">
                          <div>
                            <div className="flex font-medium items-center text-lg">
                              <Avatar
                                size="small"
                                sx={{ width: 25, height: 25 }}
                              >
                                {quotation?.serviceProvider?.name?.[0].toUpperCase()}
                              </Avatar>
                              {console.log(quotation?.serviceProvider?._id)}
                              <Link
                                to={`/serviceProvider/${quotation?.serviceProvider?._id}`}
                              >
                                <p className="ml-2 capitalize hover:underline">
                                  {quotation?.serviceProvider?.name}
                                </p>
                              </Link>
                            </div>
                            <p className="px-1 mt-2">{quotation?.quote}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className="ml-4 mt-4 flex flex-col gap-4">
                      <div className="border-l-4 px-2">
                        <div>
                          <div className="flex font-medium items-center text-lg">
                            <Avatar size="small" sx={{ width: 25, height: 25 }}>
                              S
                            </Avatar>
                            <p className="ml-2">Name of the service Provider</p>
                          </div>
                          <p className="px-1 mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nisi quis atque, laborum quo commodi nulla ut
                            velit inventore veritatis dolorem dignissimos magnam
                            voluptatem repudiandae et, officia eius facilis vero
                            ipsum voluptatibus fugiat modi minus magni natus!
                            Eveniet non nam doloribus soluta quaerat, culpa
                            similique architecto sapiente repellat aspernatur a
                            aliquid.
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div>
        <Modal open={open} onClose={handleClose}>
          <form
            className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[80%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              addQuotation();
              // window.location.reload();
            }}
          >
            <AiFillCloseSquare
              className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
              onClick={handleClose}
            />
            <h1 className=" text-3xl font-semibold mr-6">
              Quotation Request Form
            </h1>

            <div className="mt-2 w-full">
              <TextField
                label="Request Title"
                id="outlined-size-normal"
                variant="standard"
                color="grey"
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                fullWidth
                required
                value={quotationHeadline}
                onChange={(event) => {
                  setQuotationHeadline(event.target.value);
                }}
              />
            </div>

            <div className="mt-8 w-full">
              <TextField
                label="Request Body"
                id="outlined-size-normal"
                color="grey"
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                rows={10}
                multiline
                fullWidth
                required
                value={quotationBody}
                onChange={(event) => {
                  setQuotationBody(event.target.value);
                }}
              />
            </div>
            <div className="capitalize mt-4 ">
              <p className="text-xl font-medium mb-1">Request For:</p>

              {serviceCategories.map((service, index) => (
                <FormControlLabel
                  value={service.occupation}
                  control={
                    <Radio
                      checked={quotationService === service.occupation}
                      onChange={(e) => setQuotationService(service.occupation)}
                      value={service.occupation}
                    />
                  }
                  label={service.occupation}
                  key={index}
                />
              ))}
            </div>
            <button className="mt-6 py-4 bg-slate-800 text-gray-100 rounded text-xl">
              Submit
            </button>
          </form>
        </Modal>
      </div>
      <div>
        <Modal open={updateOpen} onClose={handleUpdateClose}>
          <form
            className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[80%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              updateQuotationRequest();
              // window.location.reload();
            }}
          >
            <AiFillCloseSquare
              className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
              onClick={handleUpdateClose}
            />
            <h1 className=" text-3xl font-semibold mr-6">
              Update Quotation Request
            </h1>

            <div className="mt-2 w-full">
              <TextField
                label="Request Title"
                id="outlined-size-normal"
                variant="standard"
                color="grey"
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                fullWidth
                required
                value={updateQHeadline}
                onChange={(event) => {
                  setUpdateQHeadline(event.target.value);
                }}
              />
            </div>
            <div className="mt-8 w-full">
              <TextField
                label="Request Body"
                id="outlined-size-normal"
                color="grey"
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                rows={10}
                multiline
                fullWidth
                required
                value={updateQBody}
                onChange={(event) => {
                  setUpdateQBody(event.target.value);
                }}
              />
            </div>
            <div className="capitalize mt-4 ">
              <p className="text-xl font-medium mb-1">Request For:</p>

              {serviceCategories.map((service, index) => {
                return (
                  <FormControlLabel
                    value={service.occupation}
                    control={
                      <Radio
                        checked={
                          updateQService?.toLowerCase() === service.occupation
                        }
                        onChange={(e) => setUpdateQService(service.occupation)}
                        value={service.occupation}
                      />
                    }
                    label={service.occupation}
                    key={index}
                  />
                );
              })}
            </div>
            <button className="mt-6 py-4 bg-slate-800 text-gray-100 rounded text-xl">
              Update
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Quotations;
