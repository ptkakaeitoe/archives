const express = require("express");
const app = express();
app.use(express.json());

const cards = [];
const PASSCODE = process.env.PASSCODE || "2516";

app.post("/", (req, res) => {
  const { title, shortDesc, longDesc, imageUrl, passcode } = req.body;

  if (passcode !== PASSCODE) {
    return res.status(403).json({ error: "Invalid passcode." });
  }

  if (!title || !shortDesc || !longDesc) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const card = { title, shortDesc, longDesc, imageUrl };
  cards.push(card);
  res.status(201).json({ message: "Card added successfully." });
});

app.delete("/", (req, res) => {
  const { title } = req.body;
  cards = cards.filter((card) => card.title !== title);
  res.json({ message: "Card deleted successfully." });
});

module.exports = app;
