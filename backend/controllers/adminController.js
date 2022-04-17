const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");

const generateToken = (id) => {
  const payload = { id, type: "admin" };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30d" };
  return jwt.sign(payload, secret, options);
};

// @desc    - Login admin
// @route   - POST /api/admin/login
// @access  - Public

const adminLogin = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const admin = await Admin.findOne({ userName });
  if (!admin) {
    return res.status(400).json({
      success: false,
      message: "Admin not found",
    });
  }

  console.log(password, admin.password);
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid Crendentials",
    });
  }
  const token = generateToken(admin._id);
  return res.status(200).json({
    success: true,
    message: "Login Successfull ",
    data: {
      id: admin._id,
      userName: admin.userName,
      type: "admin",
      token,
    },
  });
});

// @desc    - Register
// @route   - POST /api/admin/register
// @access  - Public

const adminRegister = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const admin = await Admin.findOne({ userName });
  if (admin) {
    return res.status(400).json({
      success: false,
      message: "Admin already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = await Admin.create({ userName, password: hashedPassword });
  const token = generateToken(newAdmin._id);
  return res.status(201).json({
    success: true,
    token,
    message: "Admin Registered successfully",
    data: {
      id: newAdmin._id,
      userName: newAdmin.userName,
      type: "admin",
    },
  });
});

// @desc    - Get all admins
// @route   - GET /api/admin/

const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  return res.status(200).json({
    success: true,
    data: admins,
  });
});

module.exports = {
  adminLogin,
  adminRegister,
  getAdmins,
};
