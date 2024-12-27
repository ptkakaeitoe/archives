const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database (you can replace this with a real database later)
let cards = [];

const PASSCODE = "2516"; // Secure this in environment variables in production

app.post("/cards", (req, res) => {
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

app.delete("/cards", (req, res) => {
  const { title } = req.body;
  cards = cards.filter((card) => card.title !== title);
  res.json({ message: "Card deleted successfully." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//another one
// Endpoint to fetch the passcode
app.get("/passcode", (req, res) => {
  res.json({ passcode: PASSCODE });
});
