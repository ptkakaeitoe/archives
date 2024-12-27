let blogs = []; // Temporary in-memory storage. Replace with a database for production.

module.exports = (req, res) => {
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
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { id, passcode } = JSON.parse(body);

      if (passcode !== "2516") {
        return res.status(403).send("Forbidden");
      }

      blogs = blogs.filter((blog) => blog.id !== id);
      return res.status(204).send();
    });
  } else {
    return res.status(405).send("Method Not Allowed");
  }
};
