const express = require("express");

const app = express();
const port = process.env.PORT_SECOND || 3001;

app.get("/s3", async (req, res) => {
  res.send("s3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
