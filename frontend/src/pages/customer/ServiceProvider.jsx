import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { GoPerson } from "react-icons/go";
import { GrLocation, GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import { getServiceProvider } from "../../api/serviceProviderSearch";
import { toast } from "react-toastify";
import { getServiceProviderReviews, postReview } from "../../api/review";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";
import AOS from "aos";
import Map, { Marker } from "react-map-gl";
import { MdLocationPin, MdVerifiedUser } from "react-icons/md";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdOutlineRateReview } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard";
import { FiImage } from "react-icons/fi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ServiceProvider = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openImage, setOpenImage] = useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const user = useRecoilValue(authState);
  const navigate = useNavigate();

  // console.log(user);

  // console.log(user);

  const [reviewStars, setReviewStars] = useState(0);
  let { id } = useParams(); // id is the id of the service provider
  const [serviceProvider, setServiceProvider] = useState(null); // get service provider details
  const [reviews, setReviews] = useState([]); // get reviews

  const [reviewHeadline, setReviewHeadline] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  // console.log(reviewHeadline, reviewBody, reviewStars);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  // post review

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 16,
    width: "800px",
    height: "400px",
  });

  useEffect(() => {
    getServiceProvider(id)
      .then((res) => {
        setServiceProvider(res.data);
        setViewPort({
          ...viewPort,
          latitude: res?.data?.address?.latitude,
          longitude: res?.data?.address?.longitude,
        });
      })
      .catch((err) => toast.error("User Not Found"));

    getServiceProviderReviews(id)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Reviews"));
  }, [id]);

  // console.log(serviceProvider);

  let overallRating = 0;
  serviceProvider?.reviews.forEach((review) => {
    overallRating += review.rating / serviceProvider.reviews.length;
  });

  let date = new Date(serviceProvider?.createdAt);

  // console.log(reviews);

  const addReview = async () => {
    // console.log({
    //   reviewHeadline,
    //   review: reviewBody,
    //   rating: reviewStars,
    //   serviceProvider: id,
    //   customer: user.id,
    // });
    const response = await postReview({
      reviewHeadline,
      review: reviewBody,
      rating: reviewStars,
      serviceProvider: id,
      customer: user.id,
    });
    if (response.success) {
      setReviewStars(0);
      setReviewHeadline("");
      setReviewBody("");
      getServiceProvider(id)
        .then((res) => {
          setServiceProvider(res.data);
        })
        .catch((err) => toast.error("User Not Found"));
      getServiceProviderReviews(id)
        .then((res) => {
          setReviews(res.data);
          setOpen(false);
          toast.success(response.message);
        })
        .catch((err) => console.log("No Reviews"));
    } else {
      toast.error(response.message);
    }
  };

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    getServiceProviderReviews(id, "", event.target.value)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  return (
    <>
      <Nav fixed={false} />

      {serviceProvider ? (
        <div className="max-w-screen flex flex-col  mt-4 lg:px-24 px-7 font-roboto  text-gray-700">
          <div className="flex md:flex-row flex-col justify-between">
            <div className="md:w-3/12 w-full min-w-[250px]  py-5 px-2 gap-4 flex flex-col text-lg">
              <div className="flex flex-center">
                {serviceProvider?.profileImage ? (
                  <img
                    src={serviceProvider?.profileImage}
                    alt="logo"
                    className="md:w-full md:max-h-max max-h-80 sm:w-8/12 w-full  border-8 border-slate-300"
                  />
                ) : (
                  <div
                    className="md:w-full md:max-h-max max-h-80 sm:w-8/12 w-full  border-8 border-slate-300 flex flex-center
                   h-80"
                  >
                    <p className="text-3xl">No Image</p>
                    <FiImage className="text-5xl" />
                  </div>
                )}
              </div>
              <h2 className="text-lg">
                <span className="font-bold">Registered On:</span>{" "}
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <div className="flex flex-col border-t-2 py-4 gap-2 ">
                <div className="flex items-center ">
                  <GoPerson className="text-xl" />
                  <h2 className="ml-3 capitalize">
                    {serviceProvider.owner || serviceProvider.name}
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
                  <Link to={`mailto:${serviceProvider?.businessEmail}`}>
                    <h2 className="ml-3 "> {serviceProvider?.businessEmail}</h2>
                  </Link>
                </div>
                <div className="flex items-center ">
                  <FaBusinessTime className="text-xl" />
                  <h2 className="ml-3 ">
                    {serviceProvider?.experience} Years Experience
                  </h2>
                </div>

                <div className="flex flex-col border-t-2 py-4 gap-2 ">
                  {user ? (
                    <button
                      className="mt-2 py-2 bg-slate-800 text-gray-100 rounded flex flex-center"
                      onClick={handleOpen}
                    >
                      Write a Review
                      <MdOutlineRateReview className="ml-2 text-white" />
                    </button>
                  ) : (
                    <button
                      className="mt-2 py-2 bg-slate-800 text-gray-100 rounded flex flex-center"
                      onClick={() => navigate("/login")}
                    >
                      Login to Review
                      <BiLogIn className="ml-2 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-9/12 w-full min-w-[250px]  py-5  gap-2 flex flex-col md:px-16 px-2  ">
              <div className=" md:text-left text-center">
                <div className="flex items-center gap-2  ">
                  <h1 className="text-5xl font-semibold capitalize">
                    {serviceProvider.name}
                  </h1>
                  {serviceProvider?.verified && (
                    <MdVerifiedUser className="text-3xl text-blue-700" />
                  )}
                </div>

                <p className="text-xl font-semibold text-gray-500">
                  {serviceProvider.type === "individual"
                    ? "Individual Business"
                    : "Company"}
                </p>
                <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  About
                </h2>
                <p className="text-lg  text-justify">
                  {serviceProvider.description}
                </p>
                <h2 className="border-t-8  border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  Services
                </h2>
                <div className="flex text-lg  px-2 flex-wrap">
                  {serviceProvider.services.map((service, index) => (
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
                    <div className="flex my-4 gap-x-3 gap-y-4  max-h-[350px] overflow-x-scroll cursor-pointer">
                      {serviceProvider?.portfolioImages.map((image, index) => (
                        <img
                          src={image || "https://via.placeholder.com/300"}
                          alt="my work"
                          className="h-52 rounded-md"
                          onClick={() => {
                            setCurrentImage(image);
                            setOpenImage(true);
                          }}
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
          <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
            Ratings and Reviews
          </h2>
          <div className="flex md:flex-row flex-col justify-between">
            <div className="md:w-3/12 w-full min-w-[250px]  py-5  gap-4 flex flex-col text-lg ">
              <h4 className="text-2xl font-semibold border-t-4 border-b-4 text-center py-3">
                Ratings
              </h4>
              <div className="flex items-center flex-col">
                <h4 className="text-6xl font-semibold text-[#ffb730]">
                  {Math.round(overallRating * 2) / 2}
                </h4>
                <Rating
                  readOnly
                  value={overallRating}
                  defaultValue={overallRating}
                  size="large"
                  className="mt-2"
                  precision={0.5}
                />
                <p className="mt-2 text-slate-500 font-medium">
                  {serviceProvider?.reviews?.length} reviews
                </p>
              </div>
            </div>
            <div className="md:w-8/12 w-full min-w-[250px]  py-5  gap-2 flex flex-col md:px-16 px-2 ">
              <h4 className="text-2xl font-semibold border-t-4 border-b-4 text-center py-3">
                Reviews
              </h4>
              <div>
                <div className="flex justify-end">
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
                      <MenuItem value={"new"}>Newest</MenuItem>
                      <MenuItem value={"old"}>Oldest</MenuItem>
                      <MenuItem value={"rating"}>Rating(Low to High)</MenuItem>
                      <MenuItem value={"-rating"}>Rating(High to Low)</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full flex flex-col gap-8 py-8">
                  {reviews.length === 0 && (
                    <div className="text-3xl font-smooch font-semibold text-center text-gray-400">
                      No Reviews!! Be the first one to review this service
                      provider.
                    </div>
                  )}
                  {/* {reviews?.map((review, index) => (
                    <div key={index}>
                      <div className="flex justify-between flex-wrap">
                        <div className="">
                          <div className="flex items-center">
                            <Avatar
                              sx={{ width: 45, height: 45 }}
                              className="text-sm"
                            >
                              {review?.customer?.name?.[0]}
                            </Avatar>
                            <div className="ml-3">
                              <p className=" text-slate-500 font-semibold">
                                {review?.customer?.name}
                              </p>
                              <div>
                                <Rating
                                  name="size-medium"
                                  value={review.rating}
                                  readOnly
                                  size="small"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
                          {new Date(review?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="mt-2">
                        <h2 className="text-lg font-semibold">
                          {review?.reviewHeadline}
                        </h2>
                        <p className="mt-2">{review?.review}</p>
                      </div>
                    </div>
                  ))} */}
                  {reviews?.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              data-aos="fade-in"
            >
              <form
                className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[80%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  addReview();
                  // window.location.reload();
                }}
              >
                <AiFillCloseSquare
                  className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
                  onClick={handleClose}
                />
                <h1 className=" text-3xl font-semibold mr-6 capitalize">
                  Review Form for {serviceProvider?.name}
                </h1>
                <Rating
                  name="formRating"
                  value={reviewStars}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setReviewStars(newValue);
                  }}
                  className="mt-6"
                />
                <div className="mt-2 w-full">
                  <TextField
                    label="Review Headline"
                    id="outlined-size-normal"
                    variant="standard"
                    color="grey"
                    inputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    fullWidth
                    required
                    value={reviewHeadline}
                    onChange={(event) => {
                      setReviewHeadline(event.target.value);
                    }}
                  />
                </div>

                <div className="mt-8 w-full">
                  <TextField
                    label="Review"
                    id="outlined-size-normal"
                    color="grey"
                    inputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    rows={10}
                    multiline
                    fullWidth
                    required
                    value={reviewBody}
                    onChange={(event) => {
                      setReviewBody(event.target.value);
                    }}
                  />
                </div>
                <button className="mt-6 py-4 bg-slate-800 text-gray-100 rounded text-xl">
                  Submit
                </button>
              </form>
            </Modal>
            <Modal
              open={openImage}
              onClose={handleCloseImage}
              data-aos="fade-in"
            >
              <div className="absolute top-1/2 left-1/2 bg-slate-100 -translate-x-1/2 -translate-y-1/2 rounded  p-2 flex flex-col">
                <AiFillCloseSquare
                  className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer bg-white"
                  onClick={handleCloseImage}
                />
                <img
                  src={currentImage}
                  alt="portfolio"
                  className="w-full max-h-[70vh]"
                />
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="flex flex-center w-screen h-screen">
          <h1 className="text-5xl font-smooch">Service Provider Not Found</h1>
        </div>
      )}
    </>
  );
};

export default ServiceProvider;

// const ReviewCard = ({ review }) => {
//   return (
//     <div>
//       <div className="flex justify-between flex-wrap">
//         <div className="">
//           <div className="flex items-center">
//             <Avatar sx={{ width: 45, height: 45 }} className="text-sm">
//               {review?.customer?.name?.[0]}
//             </Avatar>
//             <div className="ml-3">
//               <p className=" text-slate-500 font-semibold">
//                 {review?.customer?.name}
//               </p>
//               <div>
//                 <Rating
//                   name="size-medium"
//                   value={review.rating}
//                   readOnly
//                   size="small"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
//           {new Date(review?.createdAt).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </p>
//       </div>
//       <div className="mt-2">
//         <h2 className="text-lg font-semibold">{review?.reviewHeadline}</h2>
//         <p className="mt-2">{review?.review}</p>
//       </div>
//     </div>
//   );
// };
