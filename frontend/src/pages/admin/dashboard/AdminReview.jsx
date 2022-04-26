import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { getAllReviews, deleteReview } from "../../../api/review";

import { Avatar, Rating } from "@mui/material";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RiDeleteBinLine } from "react-icons/ri";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getAllReviews()
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Reviews"));
  }, []);
  console.log(reviews);

  const [sort, setSort] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    getAllReviews(text, event.target.value)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const getReviewByText = (event) => {
    setText(event.target.value);
    getAllReviews(event.target.value, sort)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const deleteUserReview = (id) => {
    deleteReview(id)
      .then((res) => {
        getAllReviews()
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => console.log("No Service Providers"));
        toast.success("Review Deleted Successfully", {
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Error Deleting Review");
      });
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"reviews"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Reviews</h1>
        <div className="w-full flex flex-col gap-8 py-8">
          <div className="flex justify-between">
            <input
              type={"text"}
              className="w-60 border-2 border-gray-300 rounded-lg p-2"
              placeholder="Search by text"
              onChange={getReviewByText}
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
                <MenuItem value={"new"}>Newest</MenuItem>
                <MenuItem value={"old"}>Oldest</MenuItem>
                <MenuItem value={"rating"}>Rating(Low to High)</MenuItem>
                <MenuItem value={"-rating"}>Rating(High to Low)</MenuItem>
              </Select>
            </FormControl>
          </div>
          {reviews.length === 0 ? (
            <div className="flex justify-center">
              <h1 className="text-5xl font-semibold font-smooch text-gray-600 capitalize">
                No Reviews
              </h1>
            </div>
          ) : (
            ""
          )}
          {reviews?.map((review, index) => (
            <div key={index} className="p-5 shadow-xl border rounded-lg">
              <div>
                <p className="text-xl text-slate-500 mb-4 capitalize font-semibold">
                  To: {review?.serviceProvider?.name}
                </p>
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
                            precision={0.5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
                    {new Date(review?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-lg font-semibold">
                    {review?.reviewHeadline}
                  </h2>
                  <p className="mt-2">{review?.review}</p>
                </div>
                <div className="flex justify-end mt-2">
                  <RiDeleteBinLine
                    className=" text-3xl cursor-pointer text-red-500"
                    onClick={() => {
                      deleteUserReview(review._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReview;
