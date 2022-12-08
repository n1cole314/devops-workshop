const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/s3", async (req, res) => {
  res.send("s3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
