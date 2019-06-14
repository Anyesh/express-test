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

app.use("/.netlify/functions/server", router); // path must route to lambda

//  configuring BOT
let bot = new Bot({
  token:
    "EAAOqXvH9M2UBAGNj3VIJsL5XowsA2Ja83ak9IUweWTvZCGWQZBaOHgOUCNxbPNnjivOMALKSZCzKLqFhsWqHEmVCnRAkvvB5egCfPcyZClRuVu8ckLxqyCBRemElzquRAfUFxWvOlX3Khcc6A1Mmwa57nUZBhTbOGPLDPRzSL6gZDZD",
  verify: "MY_TOKEN",
  app_secret: "APP_SECRET"
});

// router.get("/", (req, res) => {
//   return res.json({ server: "server is running" });
// });

app.get("/", (req, res) => {
  return bot._verify(req, res);
});

app.post("/", (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({ status: "ok" }));
});

module.exports = app;
module.exports.handler = serverless(app);
