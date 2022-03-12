// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const ServiceProvider = require("../models/serviceProviderModal");


// //@desc Get all service providers
// //@route GET /api/serviceProviders
// //@access Private

// const getServiceProviders = asyncHandler(async (req, res) => {
//   const serviceProviders = await ServiceProvider.find();
//   res.status(200).json({
//     success: true,
//     message: "All service providers",
//     count: serviceProviders.length,
//     data: serviceProviders,
//   });
// });


// const registerServiceProvider = asyncHandler(async (req, res) => {
//   const {name} = req.body;
