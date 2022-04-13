import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/business/Sidebar";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProvider } from "../../../api/serviceProviderSearch";
import Map, { Marker } from "react-map-gl";
import { MdLocationPin, MdOutlineRateReview } from "react-icons/md";
import "mapbox-gl/dist/mapbox-gl.css";
import { GoPerson } from "react-icons/go";
import { GrLocation, GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";

const BusinessInfo = () => {
  const user = useRecoilValue(serviceProviderAuthState);
  const [serviceProvider, setServiceProvider] = useState({}); // get service provider details

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 16,
    width: "800px",
    height: "400px",
  });

  useEffect(() => {
    getServiceProvider(user?.id)
      .then((res) => {
        setServiceProvider(res.data);
        setViewPort({
          ...viewPort,
          latitude: res?.data?.address?.latitude,
          longitude: res?.data?.address?.longitude,
        });
      })
      .catch((err) => console.log("User Not Found"));
  }, [user.id]);

  console.log(serviceProvider);

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"viewInfo"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-16  font-poppins ">
        <div className="flex  flex-col justify-between">
          <div className=" w-full min-w-[250px]   px-2 gap-4 flex flex-col text-lg">
            <div className="flex flex-wrap">
              {serviceProvider?.profileImage ? (
                <img
                  src={serviceProvider?.profileImage}
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
                  {serviceProvider.name}
                </h1>
                {console.log(serviceProvider)}
                <p className="text-xl font-semibold text-gray-500 mb-4">
                  {serviceProvider.type === "individual"
                    ? "Individual Business"
                    : "Company"}
                </p>
                <h2 className="text-lg">
                  <span className="font-bold">Registered On:</span>{" "}
                  {new Date(serviceProvider?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </h2>
                <div className="flex flex-col border-t-2 py-4 gap-2 ">
                  <div className="flex items-center ">
                    <GoPerson className="text-xl" />
                    <h2 className="ml-3 capitalize">
                      {serviceProvider?.owner || serviceProvider?.name}
                    </h2>
                  </div>
                  <div className="flex items-center ">
                    <GrLocation className="text-xl" />
                    <h2 className="ml-3 text-">
                      {`${serviceProvider?.address?.neighbourhood},  ${
                        serviceProvider?.address?.city?.toLowerCase() ===
                        serviceProvider?.address?.district?.toLowerCase()
                          ? serviceProvider?.address?.city
                          : serviceProvider?.address?.city +
                            ", " +
                            serviceProvider?.address?.district
                      }`}
                    </h2>
                  </div>
                  <div className="flex items-center ">
                    <BsFillTelephoneFill className="text-xl" />
                    <Link to={`tel:${serviceProvider?.businessContactNumber}`}>
                      <h2 className="ml-3 ">
                        {serviceProvider?.businessContactNumber}
                      </h2>
                    </Link>
                  </div>
                  <div className="flex items-center ">
                    <GrMail className="text-xl" />
                    <Link to={`mailto:${serviceProvider?.email}`}>
                      <h2 className="ml-3 "> {serviceProvider?.email}</h2>
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
                {serviceProvider?.description}
              </p>
              <h2 className="border-t-8  border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                Services
              </h2>
              <div className="flex text-lg  px-2 flex-wrap">
                {serviceProvider?.services?.map((service, index) => (
                  <div className="w-3/12 " key={index}>
                    <li className="list-disc capitalize">{service}</li>
                  </div>
                ))}
              </div>
              {serviceProvider?.portfolioImages.filter((image) => image)
                .length > 0 ? (
                <>
                  <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                    Portfolio Gallery
                  </h2>
                  <div className="flex my-4 gap-x-3 gap-y-4  max-h-[350px] overflow-x-scroll">
                    {serviceProvider?.portfolioImages.map((image, index) => (
                      <img
                        src={image || "https://via.placeholder.com/300"}
                        alt="my work"
                        className="h-52 rounded-md"
                      />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
              {serviceProvider?.address?.longitude &&
              serviceProvider?.address?.latitude ? (
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
                        latitude={serviceProvider?.address?.latitude}
                        longitude={serviceProvider?.address?.longitude}
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
    </div>
  );
};

export default BusinessInfo;
