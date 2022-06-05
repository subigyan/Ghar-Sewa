const expressAsyncHandler = require("express-async-handler");

const Quotation = require("../models/quotationModel");
const Customer = require("../models/customerModal");
const ServiceProvider = require("../models/serviceProviderModal");

//@desc Get all quotations
//@route GET /api/quotations
//@access Public
const getQuotation = expressAsyncHandler(async (req, res) => {
  console.log("get");
  try {
    const quotation = await Quotation.find({ _id: req.params.id });
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer Quotations",
      count: quotation.length,
      data: quotation,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Quotation not foundzz",
      error: err.message,
    });
  }
});

//@desc post quotation
//@route POST /api/quotations
//@access Public

const postQuotations = expressAsyncHandler(async (req, res) => {
  // console.log(req.id);

  const { customer, requestHeadline, requestBody, service } = req.body;

  const newQuotation = await Quotation.create({
    customer,
    requestHeadline,
    requestBody,
    service,
  });

  res.status(201).json({
    success: true,
    message: "Quotation created",
    data: newQuotation,
  });
});

//@desc update quotation
//@route PUT /api/quotations/:id
//@access Public

const updateQuotation = expressAsyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);
  if (!quotation) {
    return res.status(404).json({
      success: false,
      message: "Quotation not found",
    });
  }
  const { requestHeadline, requestBody, service } = req.body;

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Quotation updated",
    data: updatedQuotation,
  });
});

//@desc delete quotation
//@route DELETE /api/quotations/:id
//@access Public

const deleteQuotation = expressAsyncHandler(async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Quotation deleted",
      data: quotation,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Quotation not found",
    });
  }
});

//@desc get all quotations
//@route GET /api/quotations/all
//@access Public
const getAllQuotations = expressAsyncHandler(async (req, res) => {
  const text = req.query.text;
  const textRegex = new RegExp(text, "i");
  const sort = req.query.sort;

  const sortQuery = {};
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  }

  const quotations = await Quotation.find({
    $or: [
      { requestHeadline: { $regex: textRegex } },
      { requestBody: { $regex: textRegex } },
      { service: { $regex: textRegex } },
      { "quotations.quote": { $regex: textRegex } },
    ],
  })
    .populate("customer")
    .populate("quotations.serviceProvider")
    .sort(sortQuery);

  res.status(200).json({
    success: true,
    message: "All Quotations",
    count: quotations.length,
    data: quotations,
  });
});

//@desc get quotaion by customer
//@route GET /api/quotations/service/:id
//@access Public

const getCustomerQuotations = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const text = req.query.text;
  const textRegex = new RegExp(text, "gi");
  const sort = req.query.sort;

  const sortQuery = {};
  let findQuery = {
    $elemMatch: {},
  };
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  }

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }
  const quotaion = {};
  if (sort === "replied") {
    quotations = await Quotation.find({
      customer: customer.id,
      $or: [
        { requestHeadline: { $regex: textRegex } },
        { requestBody: { $regex: textRegex } },
        { service: { $regex: textRegex } },
        { "quotations.quote": { $regex: textRegex } },
      ],
      quotations: {
        $elemMatch: {},
      },
    })
      .populate("quotations.serviceProvider")
      .sort(sortQuery);
  } else {
    quotations = await Quotation.find({
      customer: customer.id,
      $or: [
        { requestHeadline: { $regex: textRegex } },
        { requestBody: { $regex: textRegex } },
        { service: { $regex: textRegex } },
        { "quotations.quote": { $regex: textRegex } },
      ],
    })
      .populate("quotations.serviceProvider")
      .sort(sortQuery);
  }

  res.status(200).json({
    success: true,
    message: "Customer Quotations",
    count: quotations.length,
    data: quotations,
  });
});

//@desc get quotaion by quotation service
//@route GET /api/quotations/service/:id
//@access Public
const getQuotationByService = expressAsyncHandler(async (req, res) => {
  const service = req.query.service;
  const quotations = await Quotation.find({ service: service }).populate(
    "customer"
  );
  return res.status(200).json({
    success: true,
    message: "Quotations by service",
    count: quotations.length,
    data: quotations,
  });
});

//@desc add quote
//@route POST /api/quotations/addquote
//@access Public

const addQuote = expressAsyncHandler(async (req, res) => {
  const { serviceProvider, quote } = req.body;
  const fountQuotation = await Quotation.findById(req.params.id);
  if (!fountQuotation) {
    return res.status(404).json({
      success: false,
      message: "Quotation not found",
    });
  }
  fountQuotation.quotations.push({ serviceProvider, quote });
  await fountQuotation.save();

  return res.status(200).json({
    success: true,
    message: "Quotation added",
    data: fountQuotation,
  });
});

//@desc get quotation by servcie provider
//@route GET /api/quotations/serviceprovider/:id
//@access Public

const getQuotationByServiceProvider = expressAsyncHandler(async (req, res) => {
  const serviceProvider = await ServiceProvider.findById(req.params.id);

  const text = req.query.text;
  const textRegex = new RegExp(text, "i");
  const sort = req.query.sort;

  const sortQuery = {};
  if (sort === "new") {
    sortQuery.createdAt = -1;
  } else if (sort === "old") {
    sortQuery.createdAt = 1;
  }

  if (!serviceProvider) {
    return res.status(404).json({
      success: false,
      message: "Service Provider not found",
    });
  }
  const quotations = await Quotation.find({
    "quotations.serviceProvider": serviceProvider.id,
    $or: [
      { requestHeadline: { $regex: textRegex } },
      { requestBody: { $regex: textRegex } },
      { service: { $regex: textRegex } },
      { "quotations.quote": { $regex: textRegex } },
    ],
  })
    .populate("customer")
    .sort(sortQuery);
  res.status(200).json({
    success: true,
    message: "Quotations by service provider",
    count: quotations.length,
    data: quotations,
  });
});

//@desc edit service provider quote
//@route PUT /api/quotations/editquote/:id
//@access Public

const editServiceProviderQuote = expressAsyncHandler(async (req, res) => {
  const { quote } = req.body;
  const fountQuotation = await Quotation.findOne({
    "quotations._id": req.params.id,
  });
  if (!fountQuotation) {
    return res.status(404).json({
      success: false,
      message: "Quotation not found",
    });
  }
  const editedQuotes = fountQuotation?.quotations?.map((userQuotes) => {
    if (userQuotes._id.toString() === req.params.id) {
      userQuotes.quote = quote;
    }
    return userQuotes;
  });
  fountQuotation.quotations = editedQuotes;
  await fountQuotation.save();
  return res.status(200).json({
    success: true,
    message: "Quotation edited",
    data: fountQuotation,
  });
});

//@desc delete service provider quote
//@route DELETE /api/quotations/deletequote/:id
//@access Public

const deleteServiceProviderQuote = expressAsyncHandler(async (req, res) => {
  const fountQuotation = await Quotation.findOne({
    "quotations._id": req.params.id,
  });
  if (!fountQuotation) {
    return res.status(404).json({
      success: false,
      message: "Quotation not found",
    });
  }
  const editedQuotes = fountQuotation?.quotations?.filter(
    (userQuotes) => userQuotes._id.toString() !== req.params.id
  );
  fountQuotation.quotations = editedQuotes;
  await fountQuotation.save();
  return res.status(200).json({
    success: true,
    message: "Quotation deleted",
    data: fountQuotation,
  });
});

const getQuotationStats = expressAsyncHandler(async (req, res) => {
  const quotations = await Quotation.find({});
  const totalQuotations = quotations.length;
  const totalCustomers = [
    ...new Set(quotations.map((quotation) => quotation.customer.toString())),
  ].length;

  const totalServiceProviders = [
    ...new Set(
      quotations.map((quotation) =>
        quotation.quotations?.serviceProvider?.toString()
      )
    ),
  ].length;
  const totalQuotes = quotations
    .map((quotation) => quotation.quotations)
    .reduce((a, b) => a.concat(b), []).length;
  res.status(200).json({
    success: true,
    message: "Quotation stats",
    data: {
      totalQuotations,
      totalCustomers,
      totalServiceProviders,
      totalQuotes,
    },
  });
});

module.exports = {
  getQuotation,
  postQuotations,
  updateQuotation,
  deleteQuotation,
  getCustomerQuotations,
  getAllQuotations,
  getQuotationByService,
  addQuote,
  getQuotationByServiceProvider,
  editServiceProviderQuote,
  deleteServiceProviderQuote,
  getQuotationStats,
};
