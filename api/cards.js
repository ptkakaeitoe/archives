const express = require("express");
const app = express();
app.use(express.json());

let cards = []; // Use let for reassignment in DELETE route
const PASSCODE = process.env.PASSCODE || "2516";

app.post("/api/cards", (req, res) => {
  // Added /api/cards
  const { title, shortDesc, longDesc, imageUrl, passcode } = req.body;

  if (!passcode || passcode !== PASSCODE) {
    // Check if passcode is provided
    return res.status(403).json({ error: "Invalid or missing passcode." });
  }

  if (!title || !shortDesc || !longDesc) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const card = { title, shortDesc, longDesc, imageUrl };
  cards.push(card);
  res.status(201).json({ message: "Card added successfully.", card: card }); // Return the created card
});

app.get("/api/cards", (req, res) => {
  // Added GET route
  res.json(cards);
});

app.delete("/api/cards", (req, res) => {
  // Added /api/cards
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required for deletion." });
  }
  const initialLength = cards.length;
  cards = cards.filter((card) => card.title !== title);
  if (initialLength === cards.length) {
    return res.status(404).json({ error: "Card not found." });
  }
  res.json({ message: "Card deleted successfully." });
});

module.exports = app;
