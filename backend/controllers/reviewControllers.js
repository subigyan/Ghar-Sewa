const expressAsyncHandler = require("express-async-handler");

const Review = require("../models/reviewModal");
const Customer = require("../models/customerModal");

//@desc Get all reviews
//@route GET /api/reviews
//@access Private
const getReview = expressAsyncHandler(async (req, res) => {
  const review = await Review.find({ customer: req.user.id });
  res.status(200).json({
    success: true,
    message: "Customer Reviews",
    count: review.length,
    data: review,
  });
});

//@desc add single review
//@route GET /api/reviews/:id
//@access Private
const addReview = expressAsyncHandler(async (req, res) => {
  // console.log(req.user.id);
  const user = await Customer.findById(req.user.id);
  console.log("user", user);
  const review = await Review.create({
    customer: req.user.id,
    review: req.body.review,
  });
  res.status(200).json({
    success: true,
    message: "Review created successfully",
    data: review,
  });
});

//@desc update single review
//@route PUT /api/reviews/:id
//@access Private
const updateReview = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.user.id);
  const review = await Review.findById(req.params.id);

  //check review
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  //check customer
  if (!customer) {
    res.status(400);
    throw new Error("Customer not found");
  }

  if (!req.body.review) {
    res.status(400);
    throw new Error("Please enter review");
  }

  console.log(review.customer.toString(), "--", customer.id);

  if (review.customer.toString() !== customer.id) {
    res.status(401);
    throw new Error("Customer not authorized");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  //make sure logged in customer matches the review customer

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: updatedReview,
  });
});

//@desc delete single review
//@route DELETE /api/reviews/:id
//@access Private
const deleteReview = expressAsyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    data: review,
  });
});

//

const getAllReviews = expressAsyncHandler(async (req, res) => {
  const review = await Review.find();
  res.status(200).json({
    success: true,
    message: "All reviews",
    count: review.length,
    data: review,
  });
});

module.exports = {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
};
