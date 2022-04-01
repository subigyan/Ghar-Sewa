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
  const {
    name,
    phoneNumber,
    email,
    password,
    type,
    businessEmail,
    businessContactNumber,
    description,
    owner,
    verified,
    services,
    address,
    longitude,
    latitude,
  } = req.body;

  // console.log(
  //   name,
  //   phoneNumber,
  //   email,
  //   password,
  //   type,
  //   businessEmail,
  //   businessContactNumber,
  //   description,
  //   owner,
  //   verified,
  //   services,
  //   neighbourhood,
  //   city,
  //   district,
  //   longitude,
  //   latitude
  // );

  // const address = {
  //   neighbourhood,
  //   city,
  //   district,
  // };

  console.log(address);

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
    // name,
    // email,
    // phoneNumber,
    // neighbourhood ,
    // city,
    // type,
    // district,
    // password: hashedPassword,
    // businessEmail,
    name,
    phoneNumber,
    email,
    password,
    type,
    businessEmail,
    businessContactNumber,
    description,
    owner,
    verified,
    services,
    // neighbourhood,
    // city,
    // district,
    address,
    longitude,
    latitude,
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
        address,
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

const searchServiceProvider = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const services = req.query.services;
  const neighbourhood = req.query.neighbourhood;
  const city = req.query.city;
  const district = req.query.district;

  console.log(neighbourhood);

  const nameRegex = new RegExp(name, "gi");
  const servicesRegex = new RegExp(services, "ig");
  const neighbourhoodRegex = new RegExp(neighbourhood, "ig");
  const cityRegex = new RegExp(city, "ig");
  const districtRegex = new RegExp(district, "ig");

  const search = await ServiceProvider.find({
    $and: [
      {
        services: { $regex: servicesRegex },
      },
      { name: { $regex: nameRegex } },
      {
        $and: [
          {
            $or: [
              { "address.neighbourhood": { $regex: neighbourhoodRegex } },
              { "address.city": { $regex: cityRegex } },
            ],
          },
          { "address.district": { $regex: districtRegex } },
        ],
      },
    ],
  })
    .sort({ createdAt: -1 })
    .populate("reviews");

  // const search = await ServiceProvider.find({
  //   $and: [
  //     { services: { $regex: servicesRegex } },
  //     { name: { $regex: nameRegex } },
  //     {
  //       $or: [
  //         { "address.neighbourhood": { $regex: neighbourhoodRegex } },
  //         { "address.city": { $regex: cityRegex } },
  //       ],
  //     },
  //   ],
  // });

  // const search = await ServiceProvider.find({
  //   services: { $regex: servicesRegex },
  //   name: { $regex: nameRegex },
  //   $or: [{ "address.neighbourhood": { $regex: neighbourhoodRegex } }],
  // });

  console.log(search.map((ser) => [ser.name, ser._id, ser.services, "okay"]));
  res.json({
    success: true,
    message: "Service Providers",
    count: search.length,
    data: search,
  });
});

const test = asyncHandler(async (req, res) => {
  const test = await ServiceProvider.find({}).getReviewCount();

  res.json({
    success: true,
    message: "Service Providers",
    data: test,
  });
});

module.exports = {
  registerServiceProvider,
  getServiceProviders,
  loginServiceProvider,
  getMe,
  updateServiceProvider,
  searchServiceProvider,
  test,
};
