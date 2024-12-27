const bodyParser = require("body-parser");
const cors = require("cors");

const PASSCODE = "2516"; // Secure this in environment variables in production
let cards = [];

module.exports = async (req, res) => {
  const { method } = req;

  // Middleware
  if (method === "POST") {
    const { title, shortDesc, longDesc, imageUrl, passcode } = req.body;

    if (passcode !== PASSCODE) {
      return res.status(403).json({ error: "Invalid passcode." });
    }

    if (!title || !shortDesc || !longDesc) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const card = { title, shortDesc, longDesc, imageUrl };
    cards.push(card);
    return res.status(201).json({ message: "Card added successfully." });
  }

  if (method === "DELETE") {
    const { title } = req.body;
    cards = cards.filter((card) => card.title !== title);
    return res.json({ message: "Card deleted successfully." });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};
