const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ServiceProvider = require("../models/serviceProviderModal");
const Review = require("../models/reviewModal");
const Quotation = require("../models/quotationModel");

//@desc Get all service providers
//@route GET /api/serviceProviders
//@access Public
const getServiceProviders = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const sort = req.query.sort;

  const sortQuery = {};
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  }

  const nameRegex = new RegExp(name, "gi");
  const serviceProviders = await ServiceProvider.find({
    name: { $regex: nameRegex },
  }).sort(sortQuery);
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

    experience,
  } = req.body;

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
    experience,
    address,
    password: hashedPassword,
  });

  if (serviceProvider) {
    res.status(201).json({
      success: true,
      message: "Service Provider Created Successfully",
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
  let { email, password } = req.body;
  email = email.toLowerCase();
  const serviceProvider = await ServiceProvider.findOne({ email });
  if (!serviceProvider) {
    return res.status(400).json({
      success: false,
      message: "ServiceProvider not found",
    });
  } else {
    const match = await bcrypt.compare(password, serviceProvider.password);

    if (match) {
      return res.status(200).json({
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
      return res.status(400).json({
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

  const { address } = req.body;
  if (address) {
    address.fullLocation =
      address.neighbourhood + ", " + address.city + ", " + address.district;
  }

  if (!serviceProvider) {
    res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }
  console.log(req.body);
  const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
    req.params.id,
    { ...req.body, address },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Business Infromation  Updated Successfully",
    data: updatedServiceProvider,
  });
});

const searchServiceProvider = asyncHandler(async (req, res) => {
  const name = req.query?.name?.trim().toLowerCase();
  let service = req.query?.service?.trim().toLowerCase();
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

  const serviceRegex = new RegExp(service, "ig");
  // const neighbourhoodRegex = new RegExp(neighbourhood, "ig");
  // const cityRegex = new RegExp(city, "ig");
  // const districtRegex = new RegExp(district, "ig");
  const locationRegex = new RegExp(location, "ig");
  const locationSplitOneRegex = new RegExp(locationSplitOne, "ig");
  const locationSplitTwoRegex = new RegExp(locationSplitTwo, "ig");
  const locationSplitThreeRegex = new RegExp(locationSplitThree, "ig");

  let locationQuery = {};

  if (location) {
    locationQuery = {
      $or: [
        { "address.neighbourhood": { $regex: locationSplitOneRegex } },
        { "address.neighbourhood": { $regex: locationSplitTwoRegex } },
        { "address.neighbourhood": { $regex: locationSplitThreeRegex } },
        { "address.city": { $regex: locationSplitOneRegex } },
        { "address.city": { $regex: locationSplitTwoRegex } },
        { "address.city": { $regex: locationSplitThreeRegex } },
        { "address.fullLocation": { $regex: locationRegex } },
      ],
    };
  }

  const search = await ServiceProvider.find({
    $and: [
      {
        services: { $regex: serviceRegex },
      },
      {
        // $or: [
        //   { "address.neighbourhood": { $regex: locationSplitOneRegex } },
        //   { "address.neighbourhood": { $regex: locationSplitTwoRegex } },
        //   { "address.neighbourhood": { $regex: locationSplitThreeRegex } },
        //   { "address.city": { $regex: locationSplitOneRegex } },
        //   { "address.city": { $regex: locationSplitTwoRegex } },
        //   { "address.city": { $regex: locationSplitThreeRegex } },
        //   { "address.fullLocation": { $regex: locationRegex } },
        // ],
        locationQuery,
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

//@desc delete service provider
//@route DELETE /api/serviceProvider/:id
//@access Public

const deleteServiceProvider = asyncHandler(async (req, res) => {
  const serviceProvider = await ServiceProvider.findById(req.params.id);

  if (!serviceProvider) {
    res.status(404).json({
      success: false,
      message: "ServiceProvider not found",
    });
  }
  const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(
    req.params.id
  );

  await Review.deleteMany({
    serviceProvider: req.params.id,
  });

  await Quotation.deleteMany({
    "quotations.serviceProvider": req.params.id,
  });

  res.status(200).json({
    success: true,
    message: "ServiceProvider deleted successfully",
    data: deletedServiceProvider,
  });
});

const getServiceProvidersStats = asyncHandler(async (req, res) => {
  const serviceProviders = await ServiceProvider.find();
  let plumberCount = 0;
  let electricianCount = 0;
  let builderCount = 0;
  let painterCount = 0;
  let carpenterCount = 0;
  let cleanerCount = 0;
  let mechanicCount = 0;
  let handymandCount = 0;
  serviceProviders.forEach((serviceProvider) => {
    if (serviceProvider.services.includes("plumber")) {
      plumberCount++;
    }
    if (serviceProvider.services.includes("electrician")) {
      electricianCount++;
    }
    if (serviceProvider.services.includes("builder")) {
      builderCount++;
    }
    if (serviceProvider.services.includes("painter")) {
      painterCount++;
    }
    if (serviceProvider.services.includes("carpenter")) {
      carpenterCount++;
    }
    if (serviceProvider.services.includes("cleaner")) {
      cleanerCount++;
    }
    if (serviceProvider.services.includes("mechanic")) {
      mechanicCount++;
    }
    if (serviceProvider.services.includes("handyman")) {
      handymandCount++;
    }
  });
  const serviceProvidersStats = {
    totalServiceProviders: serviceProviders.length,
    serviceTypeCOunt: [
      {
        serviceType: "Plumber",
        count: plumberCount,
      },
      {
        serviceType: "Electrician",
        count: electricianCount,
      },
      {
        serviceType: "Builder",
        count: builderCount,
      },
      {
        serviceType: "Painter",
        count: painterCount,
      },
      {
        serviceType: "Carpenter",
        count: carpenterCount,
      },
      {
        serviceType: "Cleaner",
        count: cleanerCount,
      },
      {
        serviceType: "Mechanic",
        count: mechanicCount,
      },
      {
        serviceType: "Handyman",
        count: handymandCount,
      },
    ],
  };

  res.status(200).json({
    success: true,
    message: "ServiceProviders Stats",
    data: serviceProvidersStats,
  });
});

const test = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Service Providers",
    data: "search",
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
  deleteServiceProvider,
  getServiceProvidersStats,
  test,
};
