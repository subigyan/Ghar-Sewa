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
  getOneServiceProvider,
  deleteServiceProvider,
} = require("../controllers/serviceProviderControllers");
const { route } = require("./customerRoutes");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getServiceProviders);
router.post("/register", registerServiceProvider);
router.post("/login", loginServiceProvider);
router.get("/me", protect, getMe);
router.put("/:id", updateServiceProvider);
router.get("/provider/:id", getOneServiceProvider);
router.get("/search", searchServiceProvider);
router.delete("/:id", deleteServiceProvider);

router.get("/test", test);

module.exports = router;
