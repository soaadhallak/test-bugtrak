const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BugTrak test API",
    endpoints: {
      users: "/api/users",
      posts: "/api/posts",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

module.exports = app;
