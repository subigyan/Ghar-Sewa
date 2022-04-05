const { underline } = require("colors");

const errorHandle = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // if (statusCode == 500) {
  //     res.json({
  //         message: "Server Error",
  //     });
  // }
  res.status(statusCode).json({
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
  cosnole.log(error);
};

module.exports = errorHandle;
