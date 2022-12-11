require('dotenv').config()
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const SECOND_SERVICE_URL =
  process.env.SECOND_SERVICE_URL || "http://localhost:3001";

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/inner", async (req, res) => {
  const response = await axios.get(SECOND_SERVICE_URL + "/s3");
  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
