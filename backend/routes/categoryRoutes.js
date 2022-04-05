const express = require("express");

const router = express.Router();

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.route("/").get(getCategories);

router.route("/").post(addCategory);

router.route("/:id").put(updateCategory).delete(deleteCategory);
