let blogs = []; // Temporary in-memory storage. Replace with a database for production.

module.exports = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    return res.status(200).json(blogs);
  }

  if (method === "POST") {
    const passcode = req.body?.passcode;

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
    const { id, passcode } = req.body;

    if (passcode !== "2516") {
      return res.status(403).send("Forbidden");
    }

    const initialLength = blogs.length;
    blogs = blogs.filter((blog) => blog.id !== id);

    if (blogs.length === initialLength) {
      return res.status(404).send("Article not found.");
    }

    return res.status(204).send();
  }
};
