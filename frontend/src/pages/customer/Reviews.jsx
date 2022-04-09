import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { getCustomerReviews } from "../../api/review";
import { Modal, Rating, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authAtom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { updateReview, deleteReview } from "../../api/review";
import { toast } from "react-toastify";

const Reviews = () => {
  const [user, setUser] = useRecoilState(authState);
  const [reviews, setReviews] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getCustomerReviews(user.id)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [navigate, user?.id]);

  // console.log("ok");
  //
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewStars, setReviewStars] = useState(0);
  const [reviewHeadline, setReviewHeadline] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewId, setReviewId] = useState("");

  const updateUserReview = (id, review) => {
    updateReview(id, review)
      .then((res) => {
        handleClose();
        getCustomerReviews(user.id)
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => console.log(err));
        toast.success("Review Updated");
      })
      .catch((err) => console.log(err));
  };

  const deleteUserReview = (id) => {
    deleteReview(id)
      .then((res) => {
        getCustomerReviews(user.id)
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => console.log(err));
        toast.success("Review Deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Nav fixed={false} />
      <div className="lg:px-32 px-7 flex flex-col  max-w-screen  mt-8 text-slate-700 font-roboto">
        <h1 className=" font-bold sm:text-5xl text-4xl">My Reviews</h1>
        {reviews.length === 0 ? (
          <div className="flex flex-center font-smooch  w-full h-[full]   mt-8 text-slate-700  ">
            <h1 className="text-4xl">No Reviews Found</h1>
          </div>
        ) : (
          ""
        )}

        <div className="w-full flex flex-col gap-8 py-8">
          {reviews.map(
            (review, index) =>
              review.serviceProvider && (
                <div
                  className="border-2 rounded-md shadow-md px-8 py-6"
                  key={index}
                >
                  <div className="flex justify-between flex-wrap">
                    <div className="">
                      <div className="flex items-center">
                        {/* <Avatar sx={{ width: 45, height: 45 }} className="text-sm">
                      {review?.customer?.name?.[0]}
                    </Avatar> */}
                        <div className="">
                          <p className=" font-semibold capitalize text-2xl">
                            To: {review?.serviceProvider?.name}
                          </p>
                          <div>
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                          </div>
                          <p className="font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
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
                      </div>
                    </div>
                    <div className="flex  font-semibold  ">
                      <BiEdit
                        className="text-3xl text-green-600 cursor-pointer"
                        onClick={() => {
                          setReviewHeadline(review?.reviewHeadline);
                          setReviewBody(review?.review);
                          setReviewStars(review?.rating);
                          setReviewId(review?._id);
                          handleOpen();
                        }}
                      />
                      <MdDeleteOutline
                        className="text-3xl text-red-600 ml-2 cursor-pointer"
                        onClick={() => {
                          deleteUserReview(review?._id);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-slate-700">
                    <h2 className="text-lg font-semibold">
                      {review?.reviewHeadline}
                    </h2>
                    <p className="mt-2">{review?.review}</p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="z-50"
      >
        <form
          className="absolute top-1/2 left-1/2 min-w-[350px] w-[80%] bg-slate-100 -translate-x-1/2 -translate-y-1/2  sm:min-h-[80%] rounded sm:py-8 sm:px-10 p-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            updateUserReview(reviewId, {
              rating: reviewStars,
              reviewHeadline: reviewHeadline,
              review: reviewBody,
            });
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
            name="edit rating"
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
  );
};

export default Reviews;
