const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Customer = require("../models/customerModal");
const Review = require("../models/reviewModal");

//@desc Get all customers
//@route GET /api/customers
//@access Private
const getCustomers = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const sort = req.query.sort;

  const nameRegex = new RegExp(name, "gi");

  const sortQuery = {};
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  }
  const customers = await Customer.find({
    name: { $regex: nameRegex },
  }).sort(sortQuery);
  return res.status(200).json({
    success: true,
    message: "All customers",
    count: customers.length,
    data: customers,
  });
});

//@desc Set customer
//@route POST /api/customers
//@access Private
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  //check if customer already exists
  const customerExist = await Customer.findOne({ email });
  if (customerExist) {
    return res.status(400).json({
      success: false,
      message: "Customer already exists",
    });
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const customer = await Customer.create({
    name,
    email,
    // phoneNumber,
    password: hashedPassword,
  });
  if (customer) {
    return res.status(201).json({
      success: true,
      message: "Customer Registered Successfully",
      data: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        token: generateToken(customer._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data. Customer not created");
  }
});

//@desc Update customer by id
//@route PUT /api/customers
//@access Private
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  // console.log(customer);

  if (!customer) {
    res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: updatedCustomer,
  });
});

//@desc Delete customer by id
//@route DELETE /api/customers
//@access Private
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
  await Review.deleteMany({ customer: req.params.id });
  return res.status(200).json({
    success: true,
    message: `Customer deleted Successfully`,
    data: deletedCustomer,
  });
});

//@desc Login customer
//@route POST /api/customers/login
//@access Public
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  if (!customer) {
    return res.status(400).json({
      success: false,
      message: "Customer not found",
    });
  } else {
    const match = await bcrypt.compare(password, customer.password);
    if (match) {
      return res.status(200).json({
        success: true,
        message: "Login Successfull ",
        data: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          // phoneNumber: customer.phoneNumber,
          token: generateToken(customer._id),
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

//@desc Login customer
//@route GET /api/customers/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Customer.findById(req.user.id);
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

//Generate JSON Web Token
const generateToken = (id) => {
  const payload = { id, type: "customer" };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30d" };
  return jwt.sign(payload, secret, options);
};

module.exports = {
  getCustomers,
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  getMe,
};
