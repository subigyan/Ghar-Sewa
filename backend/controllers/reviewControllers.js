const expressAsyncHandler = require("express-async-handler");

const Review = require("../models/reviewModal");
const Customer = require("../models/customerModal");
const ServiceProvider = require("../models/serviceProviderModal");

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

  const foundCustomer = await Customer.findById(req.user.id.toString());

  const { review, serviceProvider, rating } = req.body;
  console.log("user", foundCustomer);
  const newReview = await Review.create({
    customer: foundCustomer.id,
    review,
    serviceProvider,
    rating,
  });
  const foundServiceProvider = await ServiceProvider.findById(serviceProvider);
  foundServiceProvider.reviews.push(newReview.id);
  await foundServiceProvider.save();
  // console.log(req.user.id, foundCustomer.reviews);

  res.status(200).json({
    success: true,
    message: "Review created successfully",
    data: newReview,
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

  // if (!serviceProvider) {
  //   res.status(400);
  //   throw new Error("Customer not found");
  // }

  // if (!rating) {
  //   res.status(400);
  //   throw new Error("Customer not found");
  // }
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

// const getAllReviews = expressAsyncHandler(async (req, res) => {
//   const nameQuery = req.query.name;
//   const nameRegex = new RegExp(nameQuery, "i");
//   await Review.find()
//     .populate("customer")
//     .populate("serviceProvider")
//     .exec(function (err, reviews) {
//       if (err) {
//         throw new Error(err.message);
//       }
//       const filteredReviews = reviews.filter((review) => {
//         // return review?.serviceProvider?.name.toLowerCase() === "service";
//         return nameRegex.test(review?.serviceProvider?.name);
//       });
//       res.status(200).json({
//         success: true,
//         message: "All reviews",
//         count: filteredReviews.length,
//         data: filteredReviews,
//       });
//     });
// });

const getAllReviews = expressAsyncHandler(async (req, res) => {
  const review = await Review.find()
    .populate("customer")
    .populate("serviceProvider");
  res.status(200).json({
    success: true,
    message: "All reviews",
    count: review.length,
    data: review,
  });
});

// const search = expressAsyncHandler(async (req, res) => {
//   const review = await Review.find({
//     $text: { $search: req.query.q },
//   });
//   res.status(200).json({
//     success: true,
//     message: "All reviews",
//     count: review.length,
//     data: review,
//   });

module.exports = {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
};
