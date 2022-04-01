const express = require("express");
const router = express.Router();

const {
  registerServiceProvider,
  getServiceProviders,
  loginServiceProvider,
  getMe,
  updateServiceProvider,
  searchServiceProvider,
  test,
} = require("../controllers/serviceProviderControllers");
const { route } = require("./customerRoutes");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getServiceProviders);
router.post("/register", registerServiceProvider);
router.post("/login", loginServiceProvider);
router.get("/me", protect, getMe);
router.route("/:id").put(updateServiceProvider);
router.get("/search", searchServiceProvider);

router.get("/test", test);

module.exports = router;
