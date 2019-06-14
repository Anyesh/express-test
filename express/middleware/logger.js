const moment = require("moment");

// logger setup
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format(
      "YYYY-MM-DD::hh:mmA"
    )}`
  );
  next();
};

module.exports = logger;
