const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ServiceProvider = require("../models/serviceProviderModal");

//@desc Get all service providers
//@route GET /api/serviceProviders
//@access Public
const getServiceProviders = asyncHandler(async (req, res) => {
  const serviceProviders = await ServiceProvider.find();
  res.status(200).json({
    success: true,
    message: "All service providers",
    count: serviceProviders.length,
    data: serviceProviders,
  });
});

//@desc Set service provider
//@route POST /api/serviceProviders
//@access Public
const registerServiceProvider = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, neighborhood, city, type, password } =
    req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }

  //check if ServiceProvider already exists
  const serviceProviderExists = await ServiceProvider.findOne({ email });
  if (serviceProviderExists) {
    res.status(400);
    throw new Error("Service Provider Already Exists");
  }

  //generate salt
  const salt = bcrypt.genSaltSync(10);

  //hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  const serviceProvider = await ServiceProvider.create({
    name,
    email,
    phoneNumber,
    neighborhood,
    city,
    type,
    password: hashedPassword,
  });

  if (serviceProvider) {
    res.status(201).json({
      success: true,
      message: "Service Provider Created successfully",
      data: {
        id: serviceProvider._id,
        name: serviceProvider.name,
        email: serviceProvider.email,
        phoneNumber,
        neighborhood,
        city,
        type,
        token: generateToken(serviceProvider._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data. User not created");
  }
});

//@desc Login service provider
//@route POST /api/serviceProviders/login
//@access Public
const loginServiceProvider = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const serviceProvider = await ServiceProvider.findOne({ email });

  if (!serviceProvider) {
    res.status(400).json({
      success: false,
      message: "ServiceProvider not found",
    });
  }
  const match = await bcrypt.compare(password, serviceProvider.password);

  if (match) {
    res.status(200).json({
      success: true,
      message: "Login Successfull ",
      data: {
        id: serviceProvider._id,
        name: serviceProvider.name,
        email: serviceProvider.email,

        token: generateToken(serviceProvider._id),
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Crendentials",
    });
    throw new Error("Invalid Crendentials");
  }
});

//@desc Login Service Provider
//@route GET /api/serviceProvider/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id, name, email } = await ServiceProvider.findById(req.user.id);
  // console.log(req.customer);
  res.status(200).json({
    success: true,
    message: "Welcome",
    data: {
      id: _id,
      name,
      email,
    },
  });
});

const generateToken = (id) => {
  const payload = { id, type: "serviceProvider" };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30d" };
  return jwt.sign(payload, secret, options);
};

const updateServiceProvider = asyncHandler(async (req, res) => {
  const serviceProvider = await ServiceProvider.findById(req.params.id);

  // console.log(customer);

  if (!serviceProvider) {
    res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "ServiceProvider updated successfully",
    data: updatedServiceProvider,
  });
});

module.exports = {
  registerServiceProvider,
  getServiceProviders,
  loginServiceProvider,
  getMe,
  updateServiceProvider,
};
