const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ data: "none" })
})

module.exports = server;
