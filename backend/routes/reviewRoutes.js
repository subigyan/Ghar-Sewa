const express = require("express");
const router = express.Router();

const {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
} = require("../controllers/reviewControllers");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getReview).post(protect, addReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

router.get("/all", getAllReviews);

module.exports = router;
