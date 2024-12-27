const express = require("express");
const app = express();

const PASSCODE = process.env.PASSCODE || "2516";

app.get("/", (req, res) => {
  res.json({ passcode: PASSCODE });
});

module.exports = app;
