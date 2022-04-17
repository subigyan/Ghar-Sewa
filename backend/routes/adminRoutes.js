const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminRegister,
  getAdmins,
} = require("../controllers/adminController");

router.get("/", getAdmins);
router.post("/login", adminLogin);
router.post("/register", adminRegister);

module.exports = router;
