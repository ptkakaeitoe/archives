const PASSCODE = "2516"; // Secure this in environment variables in production

module.exports = async (req, res) => {
  res.json({ passcode: PASSCODE });
};
