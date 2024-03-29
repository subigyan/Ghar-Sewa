import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Rating from "@mui/material/Rating";
import { GrLocation } from "react-icons/gr";
import { FiChevronDown, FiImage, FiPhoneCall } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { searchServiceProviders } from "../../api/serviceProviderSearch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MdPersonSearch, MdVerifiedUser } from "react-icons/md";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Footer from "../../components/Footer";
import { FcSearch } from "react-icons/fc";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "../../components/Loading";

const ServiceProviders = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const service = searchParams.get("service") || "";
  const sortBy = searchParams.get("sort") || "";

  const sortOptions = ["recent", "all", "name", "-name", "newest", "oldest"];

  const [sort, setSort] = React.useState(sortBy);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [businessType, setBusinessType] = useState("");
  const [star, setStars] = useState(0);
  const [nameFiltered, setNameFiltered] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("");
  const [starFilter, setStarFilter] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [loading, setLoading] = useState(false);

  const filterData = () => {
    setBusinessTypeFilter(businessType);
    setStarFilter(star);
    // console.log(businessTypeFilter, starFilter, "||", businessType, star);
    const filteredServiceProviders = serviceProviders.filter(
      (serviceProvider) => {
        let overallRating = 0;
        serviceProvider.reviews.forEach((review) => {
          overallRating += review.rating / serviceProvider.reviews.length;
        });
        // console.log(serviceProvider);
        return (
          serviceProvider.type.includes(businessType) && overallRating >= star
        );
      }
    );
    setNameFiltered(filteredServiceProviders);
    console.log(filteredServiceProviders);
  };

  useEffect(() => {
    setLoading(true);
    const getServiceProvider = async () => {
      const response = await searchServiceProviders(service, location, sort);
      setServiceProviders(response.data);
      setNameFiltered(response.data);
      setLoading(false);
      if (businessTypeFilter !== "" || starFilter !== 0) {
        setServiceProviders(serviceProviders.reverse());
        setNameFiltered(nameFiltered.reverse());
        filterData();
      }
    };
    getServiceProvider();
  }, [searchParams, service, location, sort]);

  // console.log(serviceProviders);
  const handleSortChange = (event) => {
    setSort(event.target.value);
    setSearchParams({
      service,
      location,
      sort: event.target.value,
    });
    // if (businessTypeFilter !== "" || starFilter !== 0) {
    //   filterData();
    // }
  };

  const handleStarChange = (event) => {
    setStars(event.target.value);
  };

  const filterByName = (event) => {
    setNameInput(event.target.value);
    const filteredServiceProviders = serviceProviders.filter(
      (serviceProvider) => {
        let overallRating = 0;
        serviceProvider.reviews.forEach((review) => {
          overallRating += review.rating / serviceProvider.reviews.length;
        });
        return (
          serviceProvider.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) &&
          serviceProvider.type.includes(businessTypeFilter) &&
          overallRating >= starFilter
        );
      }
    );
    setNameFiltered(filteredServiceProviders);
  };

  console.log("Star", star, starFilter);

  // console.log(nameFiltered, serviceProviders);

  const [pageNumber, setPageNumber] = useState(1);

  const usersPerPage = 10;
  const pagesVisited = (pageNumber - 1) * usersPerPage;

  const displayUsers = nameFiltered
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((serviceProvider) => {
      return (
        <>
          <ServiceProviderCard key={serviceProvider._id} {...serviceProvider} />
        </>
      );
    });

  return (
    <>
      <Nav fixed={false} />
      <div className="max-w-screen flex  lg:px-14 px-6 font-roboto md:flex-row flex-col ">
        <div className="md:w-3/12 w-full min-w-[250px] border-2 py-5 px-2 gap-2 flex flex-col sm:hidden">
          <h3 className="text-xl font-semibold ml-1 text-gray-800">
            Search Service Provider
          </h3>
          <div className="flex items-center h-12  bg-white border-2 px-1 rounded mt-2">
            <span className="w-1/12 h-full flex justify-center items-center  ">
              <MdPersonSearch className="text-black text-xl" />
            </span>
            <input
              className="h-full px-1 text-lg outline-none  w-11/12 "
              type="text"
              name="service"
              id="type"
              placeholder="Search"
              required
              value={nameInput}
              onChange={(e) => {
                filterByName(e);
                setPageNumber(1);
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold ml-1 text-gray-800 sm:mt-6 mt-3">
              Filter By
            </h3>
            <FiChevronDown
              className={`text-xl transition-all sm:mt-6 mt-3 block md:hidden ${
                !showFilter ? "rotate-180" : ""
              } cursor-pointer`}
              onClick={() => setShowFilter(!showFilter)}
            />
          </div>

          {showFilter && (
            <>
              <h4 className="ml-1 sm:mt-2 text-lg font-semibold text-gray-600">
                Business Type
              </h4>
              <div className="ml-6 flex flex-col">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      color="default"
                      onChange={() => setBusinessType("")}
                      checked={businessType === ""}
                    />
                  }
                  label="All"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      color="default"
                      onChange={() => setBusinessType("individual")}
                      checked={businessType === "individual"}
                    />
                  }
                  label="Individual"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      color="default"
                      onChange={() => setBusinessType("company")}
                      checked={businessType === "company"}
                    />
                  }
                  label="Company"
                />
              </div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={star}
                  onChange={handleStarChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  color="grey"
                >
                  <MenuItem value={0}>
                    <em>Stars</em>
                  </MenuItem>
                  <MenuItem value={0.51}>One Star and Higher</MenuItem>
                  <MenuItem value={1.51}>Two Stars and Higher</MenuItem>
                  <MenuItem value={2.51}>Three Stars and Higher</MenuItem>
                  <MenuItem value={3.51}>Four Stars and Higher</MenuItem>
                  <MenuItem value={4.51}>Five Stars</MenuItem>
                </Select>
              </FormControl>
              <button
                className="py-2 bg-dark text-white rounded-sm mt-1 mx-2"
                onClick={filterData}
              >
                Apply
              </button>
            </>
          )}
        </div>
        <div className="md:w-3/12 w-full min-w-[250px] border-2 py-5 px-2 gap-2 sm:flex flex-col hidden">
          <h3 className="text-xl font-semibold ml-1 text-gray-800">
            Search Service Provider
          </h3>
          <div className="flex items-center h-12  bg-white border-2 px-1 rounded mt-2">
            <span className="w-1/12 h-full flex justify-center items-center  ">
              <MdPersonSearch className="text-black text-xl" />
            </span>
            <input
              className="h-full px-1 text-lg outline-none  w-11/12 "
              type="text"
              name="service"
              id="type"
              placeholder="Search"
              required
              value={nameInput}
              onChange={(e) => {
                filterByName(e);
                setPageNumber(1);
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold ml-1 text-gray-800 sm:mt-6 mt-3">
              Filter By
            </h3>
            <FiChevronDown
              className={`text-xl transition-all sm:mt-6 mt-3 block md:hidden ${
                !showFilter ? "rotate-180" : ""
              } cursor-pointer`}
              onClick={() => setShowFilter(!showFilter)}
            />
          </div>

          <>
            <h4 className="ml-1 sm:mt-2 text-lg font-semibold text-gray-600">
              Business Type
            </h4>
            <div className="ml-6 flex flex-col">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="default"
                    onChange={() => setBusinessType("")}
                    checked={businessType === ""}
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="default"
                    onChange={() => setBusinessType("individual")}
                    checked={businessType === "individual"}
                  />
                }
                label="Individual"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="default"
                    onChange={() => setBusinessType("company")}
                    checked={businessType === "company"}
                  />
                }
                label="Company"
              />
            </div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={star}
                onChange={handleStarChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                color="grey"
              >
                <MenuItem value={0}>
                  <em>Stars</em>
                </MenuItem>
                <MenuItem value={0.51}>One Star and Higher</MenuItem>
                <MenuItem value={1.51}>Two Stars and Higher</MenuItem>
                <MenuItem value={2.51}>Three Stars and Higher</MenuItem>
                <MenuItem value={3.51}>Four Stars and Higher</MenuItem>
                <MenuItem value={4.51}>Five Stars</MenuItem>
              </Select>
            </FormControl>
            <button
              className="py-2 bg-dark text-white rounded-sm mt-1 mx-2"
              onClick={filterData}
            >
              Apply
            </button>
          </>
        </div>
        <div className="md:w-9/12 w-full shadow-lg border-gray-100">
          <div className="flex relative justify-between items-center pt-8 pb-10  md:px-10 px-5 flex-wrap gap-y-2">
            <div className="">
              <h1 className="text-3xl font-semibold capitalize">
                {service.trim() === "" ? "All Service Providers" : service}
              </h1>
              <span className="font-medium text-sm absolute bottom-3 text-gray-500 capitalize">
                Filters:{" "}
                {businessTypeFilter === "" ? "All" : businessTypeFilter}{" "}
                Businesses || {Math.round(starFilter)} Stars and Above
              </span>
            </div>
            <div className="w-48">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="grey"
                  value={
                    sortOptions.includes(sort.toLowerCase()) ? sort : "all"
                  }
                  label="Sort"
                  onChange={handleSortChange}
                  defaultValue={"all"}
                >
                  <MenuItem value={"all"}>
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"recent"}>Recently Reviewed</MenuItem>
                  <MenuItem value={"name"}>Name (A-Z)</MenuItem>
                  <MenuItem value={"-name"}>Name (Z-A)</MenuItem>
                  <MenuItem value={"newest"}>Join Date (newest)</MenuItem>
                  <MenuItem value={"oldest"}>Join Date (oldest)</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="bg-slate-100 min-h-[500px] flex flex-col ] py-8  md:px-10 sm:px-5 space-y-5 relative">
            <span className="font-medium text-sm absolute top-2  md:right-12 right-5  text-gray-500 capitalize">
              Service Providers: {(pageNumber - 1) * usersPerPage} -{" "}
              {pageNumber * usersPerPage} of {nameFiltered.length}
            </span>
            {/* {nameFiltered.length > 0
              ? nameFiltered.map((serviceProvider) => {
                  return (
                    <ServiceProviderCard
                      key={serviceProvider.id}
                      {...serviceProvider}
                    />
                  );
                })
              : serviceProviders.map((serviceProvider) => (
                  <ServiceProviderCard
                    key={serviceProvider.id}
                    {...serviceProvider}
                    filterByName={false}
                  />
                ))} */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {nameFiltered.length === 0 ? (
                  <div className="w-full h-full flex flex-center">
                    <FcSearch className="text-8xl" />
                    <p className="text-5xl font-smooch text-gray-600">
                      No Result Found
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {/* {nameFiltered?.map((serviceProvider) => {
              return (
                <ServiceProviderCard
                  key={serviceProvider._id}
                  {...serviceProvider}
                />
              );
            })} */}
                {displayUsers}
                {nameFiltered.length > 0 && (
                  <div className="mt-8 flex flex-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={
                          nameFiltered.length > 0
                            ? Math.ceil(nameFiltered.length / 10)
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
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
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
  _id,
  verified,
  profileImage,
}) => {
  let overallRating = 0;
  reviews.forEach((review) => {
    overallRating += review.rating / reviews.length;
  });

  let [searchParams, setSearchParams] = useSearchParams();

  const handleServiceClick = (service) => {
    setSearchParams({
      service: service,
    });
  };

  return (
    <div className="min-h-52 w-full bg-white rounded-lg  flex sm:flex-row   flex-col p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 ">
      <div className="flex justify-center ">
        {/* <img
          src="https://picsum.photos/200"
          alt="service provider"
          className="sm:w-44 w-full max:h-auto h-44 object-center  md:min-w-[10rem]   rounded-md "
        /> */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="logo"
            className="sm:w-44 w-full max:h-auto h-44 object-center md:min-w-[10rem] rounded-md"
          />
        ) : (
          <div
            className="sm:w-44 w-full max:h-auto h-44 object-center md:min-w-[10rem] rounded-md flex flex-center
                   border-2 border-slate-400"
          >
            <p className="text-2xl">No Image</p>
            <FiImage className="text-3xl" />
          </div>
        )}
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
            <div className="flex items-center gap-1  ">
              <Link to={`/serviceProvider/${_id}`}>
                <p className="text-2xl font-medium capitalize hover:underline">
                  {name}
                </p>
              </Link>

              {verified && <MdVerifiedUser className="text-xl text-blue-700" />}
            </div>
            <div className="flex items-center ">
              <Rating
                name="read-only"
                value={overallRating}
                precision={0.5}
                readOnly
                className="my-0 "
              />
              <p className="text-gray-400 ml-1 text-sm font-bold  min-w-4 h-full  flex flex-center ">
                {reviews.length}
              </p>
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
        <div className="w-full mt-2 flex sm:gap-2 gap-0 flex-wrap ">
          {services?.map((providerService, index) => (
            <button
              key={index}
              className="text-gray-700 text-sm border py-1 px-2 rounded-lg border-gray-300 shadow-md capitalize hover:scale-105 transition-all duration-100"
              onClick={() => {
                handleServiceClick(providerService);
              }}
            >
              {providerService}
            </button>
          ))}
        </div>
        <p className="mt-4 line-clamp-2 break-all">{description}</p>
      </div>
    </div>
  );
};
export default ServiceProviders;
