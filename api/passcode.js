module.exports = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ passcode: "2516" });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
