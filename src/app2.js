require('dotenv').config()
const express = require("express");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const app = express();
const port = process.env.PORT_SECOND || 3001;

app.get("/s3", async (req, res) => {
  const response = await s3
    .getObject({
      Bucket: process.env.S3_BUCKET || "santa-test-bucket",
      Key: process.env.S3_FILE || "santa.txt",
    })
    .promise();
  console.log(response);
  const data = response.Body.toString("utf-8");
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
