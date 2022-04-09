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
} = require("../controllers/quotationControllers");

// router.get("/:id", getQuotation);
router.post("/", postQuotations);
router.put("/:id", updateQuotation);
router.delete("/:id", deleteQuotation);
router.get("/customer/:id", getCustomerQuotations);
router.get("/all", getAllQuotations);
router.get("/search", getQuotationByService);

module.exports = router;
