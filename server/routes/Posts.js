const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const listPostPerId = await Posts.findOne({ where: { id: id } });
  res.json(listPostPerId);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
