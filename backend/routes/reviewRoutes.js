const express = require("express");
const router = express.Router();

const {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getProviderReview,
} = require("../controllers/reviewControllers");

const { protect } = require("../middlewares/authMiddleware");

router.get("/customer/:id", getReview);

router.route("/").post(addReview);

router.route("/:id").put(updateReview).delete(deleteReview);

router.get("/all", getAllReviews);

router.get("/serviceProvider/:id", getProviderReview);

module.exports = router;
