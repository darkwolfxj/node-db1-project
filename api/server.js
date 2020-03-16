const express = require("express");
const server = express();
const router = require("../router/router")
server.use(express.json());
server.use("/api/accounts", router)
module.exports = server;
