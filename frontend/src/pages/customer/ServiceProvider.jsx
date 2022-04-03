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

const ServiceProvider = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewStars, setReviewStars] = useState(0);
  let { id } = useParams(); // id is the id of the service provider
  const [serviceProvider, setServiceProvider] = useState({}); // get service provider details

  useEffect(() => {
    getServiceProvider(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log("Error Aayo"));
    console.log(serviceProvider);
  }, []);

  return (
    <>
      <Nav />

      <div className="max-w-screen flex flex-col mt-24 lg:px-24 px-7 font-roboto  text-gray-700">
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
              <span className="font-bold">Registered On:</span> 20th October
              2020
            </h2>
            <div className="flex flex-col border-t-2 py-4 gap-2 ">
              <div className="flex items-center ">
                <GoPerson className="text-xl" />
                <h2 className="ml-3 text-"> Subiii De Maan</h2>
              </div>
              <div className="flex items-center ">
                <GrLocation className="text-xl" />
                <h2 className="ml-3 text-"> Sinamangal, Kathmandu</h2>
              </div>
              <div className="flex items-center ">
                <BsFillTelephoneFill className="text-xl" />
                <h2 className="ml-3 text-"> 9841201234</h2>
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
              <h1 className="text-5xl font-semibold">Subi Plumbings</h1>
              <p className="text-xl font-semibold text-gray-500">
                Individual Business
              </p>
              <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                About
              </h2>
              <p className="text-lg  text-justify">
                We are a leading provider of plumbing services in the city of
                Mumbai. We provide services like plumbing, water supply,
                electrical, and other related services. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Rem iure ipsum, ullam amet,
                nostrum quasi quod maiores praesentium quia laborum
                reprehenderit ipsam voluptatum eos? Inventore nulla fuga
                deserunt voluptatem vero animi temporibus commodi, perspiciatis
                minima nisi odio? Vitae soluta, itaque ipsam esse sapiente vel
                facere natus consequatur explicabo, ab asperiores.
              </p>
              <h2 className="border-t-8  border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                Services
              </h2>
              <div className="flex text-lg  px-2 flex-wrap">
                <div className="w-3/12 ">
                  <li className="list-disc">Plumber</li>
                </div>
                <div className="w-3/12 ">
                  <li className="list-disc">Electrician</li>
                </div>
                <div className="w-3/12 ">
                  <li className="list-disc">Carpenter</li>
                </div>
                <div className="w-3/12 ">
                  <li className="list-disc">Builder</li>
                </div>
                <div className="w-3/12 ">
                  <li className="list-disc">Builder</li>
                </div>
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
              <h2 className="border-t-8 border-b-8 py-2 text-center text-3xl my-4 font-semibold">
                Map
              </h2>
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
              <h4 className="text-6xl font-semibold text-[#ffb730]">0</h4>
              <Rating readOnly defaultValue={2} size="large" className="mt-2" />
              <p className="mt-2 text-slate-500 font-medium">20 reviews</p>
            </div>
          </div>
          <div className="md:w-8/12 w-full min-w-[250px]  py-5  gap-2 flex flex-col md:px-16 px-2 ">
            <h4 className="text-2xl font-semibold border-t-4 border-b-4 text-center py-3">
              Reviews
            </h4>
            <div>
              <div className="w-full flex flex-col gap-8 py-8">
                <div>
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
                      incidunt, recusandae iste blanditiis in sapiente, corrupti
                      voluptas deleniti quasi totam nisi? Natus facilis qui
                      debitis, est rem, assumenda molestiae officia delectus
                      quos voluptate eum, accusantium sit ipsam.
                    </p>
                  </div>
                </div>
                <div>
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
                      incidunt, recusandae iste blanditiis in sapiente, corrupti
                      voluptas deleniti quasi totam nisi? Natus facilis qui
                      debitis, est rem, assumenda molestiae officia delectus
                      quos voluptate eum, accusantium sit ipsam.
                    </p>
                  </div>
                </div>
                <div>
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
                      incidunt, recusandae iste blanditiis in sapiente, corrupti
                      voluptas deleniti quasi totam nisi? Natus facilis qui
                      debitis, est rem, assumenda molestiae officia delectus
                      quos voluptate eum, accusantium sit ipsam.
                    </p>
                  </div>
                </div>
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
            <div className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[80%] rounded sm:py-8 sm:px-10 p-4 flex flex-col">
              <AiFillCloseSquare
                className="absolute -top-2 -right-2 m-4 text-4xl text-red-700 cursor-pointer"
                onClick={handleClose}
              />
              <h1 className=" text-3xl font-semibold mr-6">
                Review Form for Subi Plumbings
              </h1>
              <Rating
                name="half-rating"
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
                />
              </div>
              <button className="mt-6 py-4 bg-slate-800 text-gray-100 rounded text-xl">
                Submit
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ServiceProvider;
