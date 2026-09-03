const { randomUUID } = require("crypto");
const { readAll, writeAll } = require("../utils/jsonDb");

const STORE = "users";

function getAll() {
  return readAll(STORE);
}

function getById(id) {
  return getAll().find((user) => user.id === id) || null;
}

function getByEmail(email) {
  return getAll().find((user) => user.email === email) || null;
}

function create({ name, email }) {
  const users = getAll();
  const now = new Date().toISOString();
  const user = {
    id: randomUUID(),
    name,
    email,
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  console.log(users);
  console.log(user);

  return user;
}

function update(id, { name, email }) {
  const users = getAll();
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    updatedAt: new Date().toISOString(),
  };

  writeAll(STORE, users);
  return users[index];
}

function remove(id) {
  const users = getAll();
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const [deleted] = users.splice(index, 1);
  writeAll(STORE, users);
  return deleted;
}

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove,
};
