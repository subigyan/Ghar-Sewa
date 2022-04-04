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

router.route("/").get(protect, getReview).post(addReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

router.get("/all", getAllReviews);

router.get("/serviceProvider/:id", getProviderReview);

module.exports = router;
