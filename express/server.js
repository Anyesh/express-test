const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const Bot = require("messenger-bot");
// const logger = require("./middleware/logger");

// INIT APP
const app = express();
const router = express.Router();

// Init middleware
// app.use(logger);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//  configuring BOT
let bot = new Bot({
  token:
    "EAAOqXvH9M2UBAFUkZAPpk5F1Fnzclg0WNXf3zsZBb27p3Nm6xzqGei2RodrW4B6cpczMzRCPTScq07Ks0LBw8ryUupD5CMRbj1DwIJmztpio51RRCdkIl5kFDj2Pkm3Nzbg3OXIPFmOUqWtpNm5esVkuknhEgMaZCGGlSiY4AZDZD",
  verify: "MY_TOKEN",
  app_secret: "APP_SECRET"
});

// router.get("/", (req, res) => {
//   return res.json({ server: "server is running" });
// });

router.get("/", (req, res) => {
  return bot._verify(req, res);
});

router.post("/", (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({ status: "ok" }));
});

app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
