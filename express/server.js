"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const Bot = require("messenger-bot");

const router = express.Router();
//  configuring BOT
let bot = new Bot({
  token:
    "EAAOqXvH9M2UBAGNj3VIJsL5XowsA2Ja83ak9IUweWTvZCGWQZBaOHgOUCNxbPNnjivOMALKSZCzKLqFhsWqHEmVCnRAkvvB5egCfPcyZClRuVu8ckLxqyCBRemElzquRAfUFxWvOlX3Khcc6A1Mmwa57nUZBhTbOGPLDPRzSL6gZDZD",
  verify: "MY_TOKEN",
  app_secret: "APP_SECRET"
});
bot.on("error", err => {
  console.log(err.message);
});

bot.on("message", (payload, reply) => {
  let text = payload.message.text;

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err;

    reply({ text }, err => {
      if (err) throw JSON.stringify(err);

      console.log(
        `Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`
      );
    });
  });
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.get("/", (req, res) => {
  return res.json({ server: "server is running" });
});

app.get("/bot-verify", (req, res) => {
  return bot._verify(req, res);
});

app.post("/", (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({ status: "ok" }));
});

app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
