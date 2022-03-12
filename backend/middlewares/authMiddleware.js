const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModal");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //decode token
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      //get Customer and assign to req.user
      req.user = await Customer.findById(decode.id).select("-password");

      console.log(req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized. Invaild Token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized. No token provided");
  }
});

module.exports = { protect };
