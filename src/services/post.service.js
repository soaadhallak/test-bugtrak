const { randomUUID } = require("crypto");
const { readAll, writeAll } = require("../utils/jsonDb");
const userService = require("./user.service");

const STORE = "posts";

function getAll() {
  return readAll(STORE);
}

function getById(id) {
  return getAll().find((post) => post.id === id) || null;
}

function getByUserId(userId) {
  return getAll().filter((post) => post.userId === userId);
}

function create({ title, content, userId }) {
  const user = userService.getById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const posts = getAll();
  const now = new Date().toISOString();
  const post = {
    id: randomUUID(),
    title,
    content,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  posts.push(post);
  writeAll(STORE, posts);
  return post;
}

function update(id, { title, content, userId }) {
  const posts = getAll();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return null;
  }

  if (userId !== undefined) {
    const user = userService.getById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  }

  posts[index] = {
    ...posts[index],
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    ...(userId !== undefined && { userId }),
    updatedAt: new Date().toISOString(),
  };

  writeAll(STORE, posts);
  return posts[index];
}

function remove(id) {
  const posts = getAll();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return null;
  }

  const [deleted] = posts.splice(index, 1);
  writeAll(STORE, posts);
  return deleted;
}

function removeByUserId(userId) {
  const posts = getAll();
  const remaining = posts.filter((post) => post.userId !== userId);
  writeAll(STORE, remaining);
}

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  update,
  remove,
  removeByUserId,
};
