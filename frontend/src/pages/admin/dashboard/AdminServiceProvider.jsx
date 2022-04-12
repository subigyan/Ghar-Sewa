import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import {
  getServiceProviders,
  deleteServiceProvider,
} from "../../../api/serviceProvider";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Modal } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { GrLocation, GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { MdLocationPin, MdOutlineRateReview } from "react-icons/md";
import "mapbox-gl/dist/mapbox-gl.css";
import { FiImage } from "react-icons/fi";
import { updateServiceProvider } from "../../../api/serviceProvider";

const AdminServiceProvider = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [sort, setSort] = useState("");
  const [sName, setSName] = useState("");
  const [currentServiceProvider, setCurrentServiceProvider] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 16,
    width: "800px",
    height: "400px",
  });

  const handleChange = (event) => {
    setSort(event.target.value);
    getServiceProviders(sName, event.target.value)
      .then((res) => {
        setServiceProviders(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  useEffect(() => {
    getServiceProviders()
      .then((res) => {
        setServiceProviders(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  }, []);

  const getServiceProviderByName = (name) => {
    getServiceProviders(name, sort)
      .then((res) => {
        setServiceProviders(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const deleteServiceProviderInfo = (id) => {
    deleteServiceProvider(id)
      .then((res) => {
        getServiceProviders(sName, sort)
          .then((res) => {
            setServiceProviders(res.data);
          })
          .catch((err) => console.log("No Service Providers"));
        toast.success("Service Provider Deleted Successfully", {
          theme: "dark",
        });
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const provideVerification = (id) => {
    updateServiceProvider(id, {
      verified: true,
    })
      .then((res) => {
        getServiceProviders(sName, sort)
          .then((res) => {
            setServiceProviders(res.data);
          })
          .catch((err) => console.log("No Service Providers"));
        toast.success("Successfully provided verfication status", {
          theme: "dark",
        });
      })
      .catch((err) => console.log("No Service Providers"));
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"serviceProvider"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Service Providers</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          <div className="w-full min-w-[1000px]">
            <div className="flex justify-between">
              <input
                type={"text"}
                className="w-60 border-2 border-gray-300 rounded-lg p-2"
                placeholder="Search by name"
                onChange={(e) => {
                  getServiceProviderByName(e.target.value);
                  setSName(e.target.value);
                }}
              />
              <FormControl className="w-32">
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
                  <MenuItem value={"new"}>Newest</MenuItem>
                  <MenuItem value={"old"}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
              <p className="mb-2 text-sm text-gray-500 font-semibold">
                Click on servcie provider's name to display more info
              </p>
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                  <tr className="text-base">
                    <th scope="col" className="px-4 py-5">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-5">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-5">
                      Phone Number
                    </th>
                    <th scope="col" className="px-4 py-5">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-5">
                      Address
                    </th>
                    <th scope="col" className="px-4 py-5">
                      Join Date
                    </th>
                    <th scope="col" className="px-4 py-5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceProviders?.map((serviceProvider, index) => (
                    <tr className="bg-white border-b text-gray-800 hover:bg-gray-50">
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium text-gray-900 capitalize hover:underline cursor-pointer"
                        onClick={() => {
                          setCurrentServiceProvider(serviceProvider);
                          setViewPort({
                            ...viewPort,
                            latitude: serviceProvider.address.latitude,
                            longitude: serviceProvider.address.longitude,
                          });
                          handleOpen();
                        }}
                      >
                        {serviceProvider.name}
                      </th>
                      <td className="px-4 py-4">{serviceProvider.email}</td>
                      <td className="px-4 py-4">
                        {serviceProvider.phoneNumber}
                      </td>
                      <td className="px-4 py-4 capitalize">
                        {serviceProvider.type}
                      </td>
                      <td className="pl-4 py-4 capitalize">
                        {" "}
                        {`${serviceProvider?.address.neighbourhood}, ${
                          serviceProvider?.address.city.toLowerCase() ===
                          serviceProvider?.address.district.toLowerCase()
                            ? serviceProvider?.address.city
                            : serviceProvider?.address.city +
                              " " +
                              serviceProvider?.address.district
                        } `}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          serviceProvider?.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 text-right flex flex-col gap-2">
                        <span
                          className="font-medium text-red-600 cursor-pointer  hover:underline"
                          onClick={() =>
                            deleteServiceProviderInfo(serviceProvider._id)
                          }
                        >
                          Delete
                        </span>
                        {serviceProvider.verified ? (
                          <span className=" text-sky-600 font-semibold whitespace-nowrap">
                            Verified User
                          </span>
                        ) : (
                          <span
                            className="font-medium text-blue-600 cursor-pointer  hover:underline ml-4 whitespace-nowrap"
                            onClick={() =>
                              provideVerification(serviceProvider._id)
                            }
                          >
                            Provide Verification
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 min-w-[350px] w-[90%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[90%] rounded sm:py-8 sm:px-10 p-4 flex flex-col overflow-y-scroll max-h-[90%]">
          <AiFillCloseSquare
            className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
            onClick={handleClose}
          />
          <div className="flex  flex-col justify-between">
            <div className=" w-full min-w-[250px]   px-2 gap-4 flex flex-col text-lg">
              <div className="flex flex-wrap">
                {currentServiceProvider?.profileImage ? (
                  <img
                    src={currentServiceProvider?.profileImage}
                    alt="logo"
                    className="h-[280px] rounded-lg  object-contain  border-8 border-slate-300 min-w-[200px]"
                  />
                ) : (
                  <div className="h-[280px] rounded-lg  object-contain  border-8 border-slate-300 min-w-[250px] flex flex-center">
                    <p className="text-3xl">No Image</p>
                    <FiImage className="text-5xl" />
                  </div>
                )}

                <div className="7/12 pl-8">
                  <h1 className="text-5xl font-semibold capitalize">
                    {currentServiceProvider.name}
                  </h1>

                  <p className="text-xl font-semibold text-gray-500 mb-4">
                    {currentServiceProvider.type === "individual"
                      ? "Individual Business"
                      : "Company"}
                  </p>
                  <h2 className="text-lg">
                    <span className="font-bold">Registered On:</span>{" "}
                    {new Date(
                      currentServiceProvider?.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  <div className="flex flex-col border-t-2 py-4 gap-2 ">
                    <div className="flex items-center ">
                      <GoPerson className="text-xl" />
                      <h2 className="ml-3 capitalize">
                        {currentServiceProvider?.owner ||
                          currentServiceProvider?.name}
                      </h2>
                    </div>
                    <div className="flex items-center ">
                      <GrLocation className="text-xl" />
                      <h2 className="ml-3 text-">
                        {`${currentServiceProvider?.address?.neighbourhood},  ${
                          currentServiceProvider?.address?.city?.toLowerCase() ===
                          currentServiceProvider?.address?.district?.toLowerCase()
                            ? currentServiceProvider?.address?.city
                            : currentServiceProvider?.address?.city +
                              ", " +
                              currentServiceProvider?.address?.district
                        }`}
                      </h2>
                    </div>
                    <div className="flex items-center ">
                      <BsFillTelephoneFill className="text-xl" />
                      <Link
                        to={`tel:${currentServiceProvider?.businessContactNumber}`}
                      >
                        <h2 className="ml-3 ">
                          {currentServiceProvider?.businessContactNumber}
                        </h2>
                      </Link>
                    </div>
                    <div className="flex items-center ">
                      <GrMail className="text-xl" />
                      <Link to={`mailto:${currentServiceProvider?.email}`}>
                        <h2 className="ml-3 ">
                          {" "}
                          {currentServiceProvider?.email}
                        </h2>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full min-w-[250px]  pb-5  gap-2 flex flex-col   ">
              <div className=" md:text-left text-center">
                <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  About
                </h2>
                <p className="text-lg  text-justify">
                  {currentServiceProvider?.description}
                </p>
                <h2 className="border-t-8  border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  Services
                </h2>
                <div className="flex text-lg  px-2 flex-wrap">
                  {currentServiceProvider?.services?.map((service, index) => (
                    <div className="w-3/12 " key={index}>
                      <li className="list-disc capitalize">{service}</li>
                    </div>
                  ))}
                </div>
                <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  Gallery
                </h2>
                <div className="flex my-4 gap-x-3 gap-y-4  max-h-[300px] overflow-x-scroll">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                </div>
                {currentServiceProvider?.address?.longitude &&
                currentServiceProvider?.address?.latitude ? (
                  <>
                    <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                      Map
                    </h2>
                    <div className="w-full h-[350px]">
                      <Map
                        {...viewPort}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onMove={(viewPort) => {
                          setViewPort(viewPort);
                        }}
                      >
                        <Marker
                          latitude={currentServiceProvider?.address?.latitude}
                          longitude={currentServiceProvider?.address?.longitude}
                        >
                          <MdLocationPin className="text-4xl text-red-500 relative" />
                        </Marker>
                      </Map>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminServiceProvider;
