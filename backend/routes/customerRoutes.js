const express = require("express");

const router = express.Router();

const {
  getCustomers,
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  getMe,
} = require("../controllers/customerControllers");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getCustomers);
// .post(registerCustomer)

router.route("/:id").put(updateCustomer).delete(deleteCustomer);

router.post("/register", registerCustomer);

router.post("/login", loginCustomer);

router.get("/me", protect, getMe);

module.exports = router;
