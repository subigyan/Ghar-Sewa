import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Rating from "@mui/material/Rating";
import { GrLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { searchServiceProviders } from "../../services/serviceProviderSearch";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ServiceProviders = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const service = searchParams.get("service") || "";
  const sortBy = searchParams.get("sort") || "";

  const sortOptions = ["popularity", "name", "-name", "newest", "oldest"];

  const [sort, setSort] = React.useState(sortBy);

  const [serviceProviders, setServiceProviders] = useState([]);

  const getServiceProvider = async () => {
    const response = await searchServiceProviders(service, location);
    setServiceProviders(response.data);
  };

  useEffect(() => {
    getServiceProvider();
  }, [searchParams]);

  console.log(serviceProviders);
  const handleChange = (event) => {
    setSort(event.target.value);
    setSearchParams({
      service,
      location,
      sort: event.target.value,
    });
  };

  return (
    <>
      <Nav />

      <div className="max-w-screen flex mt-28 lg:px-14 px-7 font-roboto md:flex-row flex-col">
        <div className="md:w-3/12 w-full min-w-[250px]  bg-green-300">
          Filter
        </div>
        <div className="md:w-9/12 w-full shadow-lg border border-gray-100">
          <div className="flex  justify-between items-center py-5 lg:px-15 md:px-10 px-5">
            <h1 className="text-3xl font-semibold capitalize">
              Service Providers
            </h1>
            <div className="w-48">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    sortOptions.includes(sort.toLowerCase())
                      ? sort
                      : "popularity"
                  }
                  label="Sort"
                  onChange={handleChange}
                  defaultValue={"popularity"}
                >
                  <MenuItem value={"popularity"}>Popularity</MenuItem>
                  <MenuItem value={"name"}>Name (A-Z)</MenuItem>
                  <MenuItem value={"-name"}>Name (Z-A)</MenuItem>
                  <MenuItem value={"newest"}>Join Date (newest)</MenuItem>
                  <MenuItem value={"oldest"}>Join Date (oldest)</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="bg-slate-100 min-h-[500px] flex flex-col ] py-8 lg:px-15 md:px-10 sm:px-5 space-y-5">
            {serviceProviders.map((serviceProvider) => (
              <ServiceProviderCard {...serviceProvider} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ServiceProviderCard = ({
  address,
  name,
  services,
  reviews,
  description,
  businessContactNumber,
}) => {
  let overallRating = 0;
  reviews.forEach((review) => {
    overallRating += review.rating / reviews.length;
  });

  return (
    <div className="min-h-52 w-full bg-white rounded-lg  flex sm:flex-row   flex-col p-6 shadow-lg border border-gray-200 hover:scale-[1.005] hover:shadow-xl transition-all duration-200 cursor-pointer">
      <div className="flex justify-center ">
        <img
          src="https://picsum.photos/200"
          alt="service provider"
          className="sm:w-44 w-full max:h-auto h-44 object-center  md:min-w-[10rem]   rounded-md "
        />
        {/* <div className="sm:hidden text-righ">
        <div className=" flex h-min items-center ">
          <GrLocation className="text-gray-600 text-xl " />
          <p className="ml-2">Sinamangal, Kathmandu</p>
        </div>
        <div className=" flex h-min items-center ">
          <FiPhoneCall className="text-gray-600 text-xl " />
          <p className="ml-2">98418012345</p>
        </div>
      </div> */}
      </div>

      <div className="w-full  sm:mt-0 mt-4 sm:pl-6 ">
        <div className="flex justify-between flex-wrap">
          <div>
            <p className="text-2xl font-medium capitalize">{name}</p>
            <div className="flex items-center ">
              <Rating
                name="read-only"
                value={overallRating}
                precision={0.5}
                readOnly
                className="my-0 "
              />
              {/* <p className="text-gray-500 ml-2 text w-4 h-full  flex flex-center ">
                {reviews.length}
              </p> */}
            </div>
          </div>
          <div className="flex-col  sm:my-0 my-2 space-y-1 max-w-[300px] ">
            <div className=" flex h-min items-center ">
              <GrLocation className="text-gray-600 text-xl w-8" />
              <p className="ml-2 text-left">
                {`${address.neighbourhood}, ${
                  address.city.toLowerCase() === address.district.toLowerCase()
                    ? address.city
                    : address.city + " " + address.district
                } `}
              </p>
            </div>
            <div className=" flex h-min items-center ">
              <FiPhoneCall className="text-gray-600 text-xl w-8" />
              <p className="ml-2">{businessContactNumber}</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-2 flex gap-2 flex-wrap ">
          {services.map((service) => (
            <p className="text-gray-700 text-sm border py-1 px-2 rounded-lg border-gray-300 shadow-md capitalize">
              {service}
            </p>
          ))}
        </div>
        <p className="mt-4 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
export default ServiceProviders;
