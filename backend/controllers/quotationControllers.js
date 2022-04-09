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

  const { customer, requestHeadline, requestBody, service, requestImage } =
    req.body;

  const newQuotation = await Quotation.create({
    customer,
    requestHeadline,
    requestBody,
    service,
    requestImage,
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
  const { requestHeadline, requestBody, service, requestImage } = req.body;

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

const getCustomerQuotations = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }
  const quotations = await Quotation.find({ customer: customer.id });
  res.status(200).json({
    success: true,
    message: "Customer Quotations",
    count: quotations.length,
    data: quotations,
  });
});

//@desc get all quotations
//@route GET /api/quotations/all
//@access Public
const getAllQuotations = expressAsyncHandler(async (req, res) => {
  const quotations = await Quotation.find();
  res.status(200).json({
    success: true,
    message: "All Quotations",
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
  res.status(200).json({
    success: true,
    message: "Quotations by service",
    count: quotations.length,
    data: quotations,
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
};
