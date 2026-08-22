const postService = require("../services/post.service");

function getAll(req, res) {
  const { userId } = req.query;

  if (userId) {
    return res.json(postService.getByUserId(userId));
  }

  res.json(postService.getAll());
}

function getById(req, res) {
  const post = postService.getById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
}

function create(req, res) {
  const { title, content, userId } = req.body || {};

  if (!title || !content || !userId) {
    return res.status(400).json({ message: "title, content, and userId are required" });
  }

  try {
    const post = postService.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

function update(req, res) {
  const { title, content, userId } = req.body || {};

  try {
    const post = postService.update(req.params.id, { title, content, userId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

function remove(req, res) {
  const post = postService.remove(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post deleted", post });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
