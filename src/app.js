require("dotenv").config();
const express = require("express");
const axios = require("axios");

const path = require("path");
const pino = require("pino");
const { resolve } = require("path");
const app = express();
const port = process.env.PORT || 3000;

const logger = require("pino")();

const SECOND_SERVICE_URL =
  process.env.SECOND_SERVICE_URL || "http://localhost:3001";

const transport = pino.transport({
  target: "pino/file",
  options: { destination: "./logs/app.log" },
});

pino(transport);

app.get("/hello", (req, res) => {
  logger.info("hello world");
  res.send("Hello World!");
});

app.get("/inner", async (req, res) => {
  try {
    const url = SECOND_SERVICE_URL + "/s3";
    logger.info(`getting data from ${url}`);
    const response = await axios.get();
    res.send(response.data);
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Internal Server Error");
  }
});

app.get("/", function (req, res) {
  const pageFile = path.join(
    path.resolve(__dirname, ".."),
    "/static/index.html"
  );
  res.sendFile(pageFile);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  logger.info(`Example app listening on port ${port}`);
});
