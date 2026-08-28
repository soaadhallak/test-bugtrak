const userService = require("../services/user.service");

function getAll(req, res) {
  res.json(userService.getAll());
}

function getById(req, res) {
  const user = userService.getById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

function create(req, res) {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  if (userService.getByEmail(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = userService.create({ name, email });
  res.status(201).json(user);
}

function update(req, res) {
  const { name, email } = req.body || {};

  if (email) {
    const existing = userService.getByEmail(email);
    if (existing && existing.id !== req.params.id) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }

  const user = userService.update(req.params.id, { name, email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

function remove(req, res) {
  const user = userService.remove(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted", user });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
