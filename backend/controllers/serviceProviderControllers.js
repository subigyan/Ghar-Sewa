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

const getOneServiceProvider = asyncHandler(async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(
      req.params.id
    ).populate("reviews");
    if (!serviceProvider) {
      return res.status(404).json({
        success: false,
        message: "Service provider not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Service provider found",
      data: serviceProvider,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Service provider not found",
    });
  }
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

  console.log(address);
  address.fullLocation =
    address.neighbourhood + ", " + address.city + ", " + address.district;

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
  } else {
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
  const name = req.query?.name?.trim();
  let service = req.query?.service?.trim();
  const location = req.query?.location?.trim();

  if (service?.slice(-1).toLowerCase() === "s") {
    service = service.slice(0, -1);
    console.log(true);
  }

  let locationArray = [];
  if (location) {
    locationArray = location.split(" ");
  }
  const sort = req.query.sort;
  // console.log(neighbourhood);

  const sortQuery = {};

  if (sort === "-name") {
    sortQuery.name = -1;
  } else if (sort === "name") {
    sortQuery.name = 1;
  } else if (sort === "oldest") {
    sortQuery.createdAt = 1;
  } else if (sort === "newest") {
    sortQuery.createdAt = -1;
  } else if (sort === "recent") {
    sortQuery.reviews = -1;
  }
  // if (sort === "popularity") {
  // }

  const locationSplitOne = locationArray[0] || null;
  const locationSplitTwo = locationArray[1] || null;
  const locationSplitThree = locationArray[2] || null;

  const nameRegex = new RegExp(name, "gi");
  const serviceRegex = new RegExp(service, "ig");
  // const neighbourhoodRegex = new RegExp(neighbourhood, "ig");
  // const cityRegex = new RegExp(city, "ig");
  // const districtRegex = new RegExp(district, "ig");
  const locationRegex = new RegExp(location, "ig");
  const locationSplitOneRegex = new RegExp(locationSplitOne, "ig");
  const locationSplitTwoRegex = new RegExp(locationSplitTwo, "ig");
  const locationSplitThreeRegex = new RegExp(locationSplitThree, "ig");

  const search = await ServiceProvider.find({
    $and: [
      {
        services: { $regex: serviceRegex },
      },
      { name: { $regex: nameRegex } },
      {
        $or: [
          { "address.neighbourhood": { $regex: locationSplitOneRegex } },
          { "address.neighbourhood": { $regex: locationSplitTwoRegex } },
          { "address.neighbourhood": { $regex: locationSplitThreeRegex } },
          { "address.city": { $regex: locationSplitOneRegex } },
          { "address.city": { $regex: locationSplitTwoRegex } },
          { "address.city": { $regex: locationSplitThreeRegex } },
          { "address.fullLocation": { $regex: locationRegex } },
        ],
      },
    ],
  })
    .sort(sortQuery)
    .populate("reviews");

  // const search = await ServiceProvider.find({
  //   $and: [
  //     {
  //       service: { $regex: serviceRegex },
  //     },
  //     { name: { $regex: nameRegex } },
  //     {
  //       "address.fullLocation": { $regex: locationRegex },
  //     },
  //   ],
  // })
  //   .sort({ createdAt: -1 })
  //   .populate("reviews");

  // const search = await ServiceProvider.find({
  //   $and: [
  //     { service: { $regex: serviceRegex } },
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
  //   service: { $regex: serviceRegex },
  //   name: { $regex: nameRegex },
  //   $or: [{ "address.neighbourhood": { $regex: neighbourhoodRegex } }],
  // });

  res.json({
    success: true,
    message: "Service Providers",
    count: search.length,
    data: search,
  });
});

const test = asyncHandler(async (req, res) => {
  const search = await ServiceProvider.find({
    "address.neighbourhood": "Kamalphkhari",
  });
  res.json({
    success: true,
    message: "Service Providers",
    data: search,
  });
});

module.exports = {
  getOneServiceProvider,
  registerServiceProvider,
  getServiceProviders,
  loginServiceProvider,
  getMe,
  updateServiceProvider,
  searchServiceProvider,
  test,
};
