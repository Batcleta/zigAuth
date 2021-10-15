const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const { postId } = req.params;

  const getLikes = await Likes.findAll({ where: { postId: postId } });
  res.json(getLikes);
});

router.post("/", validateToken, async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;

  const found = await Likes.findOne({
    where: {
      postId: postId,
      userId: userId,
    },
  });

  if (!found) {
    const createLike = await Likes.create({
      postId: postId,
      userId: userId,
    });
    res.json(createLike);
  } else {
    await Likes.destroy({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    res.json("unlike the post");
  }
});

module.exports = router;
