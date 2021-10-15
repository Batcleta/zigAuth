const express = require("express");
const router = express.Router();
const { Posts, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: "user" });
  res.json(listOfPosts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listPostPerId = await Posts.findOne({
    where: { id: id },
    include: "user",
  });
  res.json(listPostPerId);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const userId = req.user.id;
  post.userId = userId;

  const createPost = await Posts.create(post);
  res.json(createPost);
});

module.exports = router;
