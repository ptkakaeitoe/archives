let blogs = []; // Temporary in-memory storage. Replace with a database for production.

module.exports = (req, res) => {
  const { method } = req;
  const passcode = req.body?.passcode;

  if (method === "GET") {
    return res.status(200).json(blogs);
  }

  if (method === "POST") {
    if (passcode !== "2516") {
      return res.status(403).send("Forbidden");
    }
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and Description are required." });
    }
    const newBlog = {
      id: Date.now().toString(),
      title,
      description,
      imageUrl: imageUrl || "",
    };
    blogs.push(newBlog);
    return res.status(201).json(newBlog);
  }

  if (method === "DELETE") {
    if (passcode !== "2516") {
      return res.status(403).send("Forbidden");
    }
    const { id } = req.body;
    blogs = blogs.filter((blog) => blog.id !== id);
    return res.status(204).send();
  }

  return res.status(405).send("Method Not Allowed");
};
