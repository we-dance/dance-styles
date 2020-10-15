"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const path = require("path");

var jsonServer = require("json-server");

app.use("/", jsonServer.router(path.resolve(__dirname, "db.json")));

module.exports = app;
module.exports.handler = serverless(app);
