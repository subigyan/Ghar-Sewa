import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { GoPerson } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { getServiceProvider } from "../../api/serviceProviderSearch";
import { toast } from "react-toastify";
import { getServiceProviderReviews, postReview } from "../../api/review";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";
import Footer from "../../components/Footer";
import AOS from "aos";

const ServiceProvider = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useRecoilValue(authState);

  console.log(user);

  // console.log(user);

  const [reviewStars, setReviewStars] = useState(0);
  let { id } = useParams(); // id is the id of the service provider
  const [serviceProvider, setServiceProvider] = useState(null); // get service provider details
  const [reviews, setReviews] = useState([]); // get reviews

  const [reviewHeadline, setReviewHeadline] = useState("");
  const [reviewBody, setReviewBody] = useState("");

  // console.log(reviewHeadline, reviewBody, reviewStars);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  // post review

  useEffect(() => {
    getServiceProvider(id)
      .then((res) => {
        setServiceProvider(res.data);
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
  console.log(overallRating);

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
      console.log(response);
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

  return (
    <>
      <Nav fixed={false} />

      {serviceProvider ? (
        <div className="max-w-screen flex flex-col  mt-4 lg:px-24 px-7 font-roboto  text-gray-700">
          <div className="flex md:flex-row flex-col justify-between">
            <div className="md:w-3/12 w-full min-w-[250px]  py-5 px-2 gap-4 flex flex-col text-lg">
              <div className="flex flex-center">
                <img
                  src="https://picsum.photos/200"
                  alt="logo"
                  className="md:w-full md:max-h-max max-h-80 sm:w-8/12 w-full  border-8 border-slate-300"
                />
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
                    {serviceProvider.owner && serviceProvider.name}
                  </h2>
                </div>
                <div className="flex items-center ">
                  <GrLocation className="text-xl" />
                  <h2 className="ml-3 text-"> Sinamangal, Kathmandu</h2>
                </div>
                <div className="flex items-center ">
                  <BsFillTelephoneFill className="text-xl" />
                  <h2 className="ml-3 text-"> {12456}</h2>
                </div>
                <div className="flex items-center ">
                  <GrMail className="text-xl" />
                  <h2 className="ml-3 text-">apple@gmail.com</h2>
                </div>
                <div className="flex flex-col border-t-2 py-4 gap-2 ">
                  <button
                    className="mt-2 py-2 bg-slate-800 text-gray-100 rounded"
                    onClick={handleOpen}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-9/12 w-full min-w-[250px]  py-5  gap-2 flex flex-col md:px-16 px-2  ">
              <div className=" md:text-left text-center">
                <h1 className="text-5xl font-semibold capitalize">
                  {serviceProvider.name}
                </h1>
                {console.log(serviceProvider)}
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
                <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                  Gallery
                </h2>
                <div className="flex my-4 gap-x-3 gap-y-4  max-h-[300px] overflow-x-scroll">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-40 rounded-md"
                  />
                </div>
                {serviceProvider.address.longitude &&
                serviceProvider.address.latitude ? (
                  <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                    Map
                  </h2>
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
                <div className="w-full flex flex-col gap-8 py-8">
                  {reviews.map((review, index) => (
                    <div>
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
                  ))}

                  {/* <div>
                    <div className="flex justify-between flex-wrap">
                      <div className="">
                        <div className="flex items-center">
                          <Avatar
                            sx={{ width: 45, height: 45 }}
                            className="text-sm"
                          >
                            R
                          </Avatar>
                          <div className="ml-3">
                            <p className=" text-slate-500 font-semibold">
                              Ram Krishna Apple
                            </p>
                            <div>
                              <Rating
                                name="size-medium"
                                value={2}
                                readOnly
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
                        20th October 2021
                      </p>
                    </div>
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold">Good Service</h2>
                      <p className="mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque dolorum odio nam, non saepe repellendus nemo
                        similique veritatis cumque libero amet reiciendis
                        incidunt, recusandae iste blanditiis in sapiente,
                        corrupti voluptas deleniti quasi totam nisi? Natus
                        facilis qui debitis, est rem, assumenda molestiae
                        officia delectus quos voluptate eum, accusantium sit
                        ipsam.
                      </p>
                    </div>
                  </div> */}
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
              {/* const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}; */}
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
                <h1 className=" text-3xl font-semibold mr-6">
                  Review Form for Subi Plumbings
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
