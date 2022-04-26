const expressAsyncHandler = require("express-async-handler");

const Review = require("../models/reviewModal");
const Customer = require("../models/customerModal");
const ServiceProvider = require("../models/serviceProviderModal");

//@desc Get all reviews
//@route GET /api/reviews
//@access Public
const getReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.find({ customer: req.params.id }).populate(
      "serviceProvider"
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer Reviews",
      count: review.length,
      data: review,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }
});

//@desc get service provider review
//@route GET /api/reviews/serviceProvider/:id
//@access Private

const getProviderReview = expressAsyncHandler(async (req, res) => {
  try {
    const text = req.query.text;
    const textRegex = new RegExp(text, "i");
    const sort = req.query.sort;

    const sortQuery = {};
    if (sort === "new") {
      sortQuery.createdAt = -1;
    } else if (sort === "old") {
      sortQuery.createdAt = 1;
    } else if (sort === "rating") {
      sortQuery.rating = 1;
    } else if (sort === "-rating") {
      sortQuery.rating = -1;
    }

    const review = await Review.find({
      serviceProvider: req.params.id,
      $or: [
        { review: { $regex: textRegex } },
        { reviewHeadline: { $regex: textRegex } },
      ],
    })
      .populate("customer")
      .populate("serviceProvider")
      .sort(sortQuery);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "No reviews found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Service Provider Reviews",
      count: review.length,
      data: review,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "No reviews found",
    });
  }
});

//@desc add single review
//@route GET /api/reviews/:id
//@access Private
const addReview = expressAsyncHandler(async (req, res) => {
  // console.log(req.user.id);

  // const foundCustomer = await Customer.findById(req.user.id.toString());

  const { review, serviceProvider, rating, reviewHeadline, customer } =
    req.body;
  // console.log("user", foundCustomer);
  const newReview = await Review.create({
    customer: customer,
    review,
    serviceProvider,
    rating,
    reviewHeadline,
  });
  const foundServiceProvider = await ServiceProvider.findById(serviceProvider);
  const foundCustomer = await Customer.findById(customer);

  if (!foundServiceProvider || !foundCustomer) {
    return res.status(404).json({
      success: false,
      message: "Service Provider or Customer not found",
    });
  }

  foundServiceProvider.reviews.push(newReview.id);
  await foundServiceProvider.save();
  // console.log(req.user.id, foundCustomer.reviews);

  res.status(200).json({
    success: true,
    message: "Review Created Successfully",
    data: newReview,
  });
});

//@desc update single review
//@route PUT /api/reviews/:id
//@access Private
const updateReview = expressAsyncHandler(async (req, res) => {
  // const customer = await Customer.findById(req.user.id);
  const review = await Review.findById(req.params.id);

  //check review
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (!req.body.review) {
    res.status(400);
    throw new Error("Please enter review");
  }

  // //check customer
  // if (!customer) {
  //   res.status(400);
  //   throw new Error("Customer not found");
  // }

  // if (review.customer.toString() !== customer.id) {
  //   res.status(401);
  //   throw new Error("Customer not authorized");
  // }

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
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }
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
  const text = req.query.text;
  const textRegex = new RegExp(text, "i");
  const sort = req.query.sort;

  const sortQuery = {};
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  } else if (sort === "rating") {
    sortQuery.rating = 1;
  } else if (sort === "-rating") {
    sortQuery.rating = -1;
  }

  const reviews = await Review.find({
    $or: [
      { review: { $regex: textRegex } },
      { reviewHeadline: { $regex: textRegex } },
    ],
  })
    .populate("customer")
    .populate("serviceProvider")
    .sort(sortQuery);
  res.status(200).json({
    success: true,
    message: "All reviews",
    count: reviews.length,
    data: reviews,
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

const getReviewStats = expressAsyncHandler(async (req, res) => {
  const reviews = await Review.find({ serviceProvider: req.params.id });

  const reviewStats = {
    averageRating:
      Math.round(
        (reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length) *
          2
      ) / 2,
    totalReviews: reviews.length,
    positiveReviews: reviews.filter((review) => review.rating > 3).length,
    negativeReviews: reviews.filter((review) => review.rating < 3).length,
    positivePercentage:
      (reviews.filter((review) => review.rating >= 2.5).length /
        reviews.length) *
      100,
    negativePercentage:
      (reviews.filter((review) => review.rating < 2.5).length /
        reviews.length) *
      100,
    ratingStats: [
      {
        name: "Zero Star",
        count: reviews.filter((review) => Math.round(review.rating) === 0)
          .length,
      },
      {
        name: "One Star",
        count: reviews.filter((review) => Math.round(review.rating) === 1)
          .length,
      },
      {
        name: "Two Star",
        count: reviews.filter((review) => Math.round(review.rating) === 2)
          .length,
      },
      {
        name: "Three Star",
        count: reviews.filter((review) => Math.round(review.rating) === 3)
          .length,
      },
      {
        name: "Four Star",
        count: reviews.filter((review) => Math.round(review.rating) === 4)
          .length,
      },
      {
        name: "Five Star",
        count: reviews.filter((review) => Math.round(review.rating) === 5)
          .length,
      },
    ],
  };
  res.status(200).json({
    success: true,
    message: "Review stats",
    data: reviewStats,
  });
});

module.exports = {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getProviderReview,
  getReviewStats,
};
