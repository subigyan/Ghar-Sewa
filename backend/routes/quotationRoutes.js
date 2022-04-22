const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/quotationControllers");

//for customer quotation requests
router.get("/quotation/:id", getQuotation);
router.post("/", postQuotations);
router.put("/:id", updateQuotation);
router.delete("/:id", deleteQuotation);
router.get("/customer/:id", getCustomerQuotations);
router.get("/all", getAllQuotations);
router.get("/search", getQuotationByService);

//for service provider quotations
router.post("/addQuote/:id", addQuote);
router.get("/serviceprovider/:id", getQuotationByServiceProvider);
router.put("/editquote/:id", editServiceProviderQuote);
router.delete("/deletequote/:id", deleteServiceProviderQuote);

//stats
router.get("/stats", getQuotationStats);

module.exports = router;
