const express = require("express");
const router = express.Router();
const { Comments, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const comments = await Comments.findAll({
    where: { postId: postId },
    include: "user",
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  // recupera o comment passado na requisição do body
  const comment = req.body;
  // recupera como requisição a variável criada no middleware
  const userId = req.user.id;
  const userName = req.user.username;
  // inclui o usuário no objeto que será passado como data na criação do comentário
  comment.userId = userId;
  // cria o comentário com as informações de commentBody, postId e userId
  const createComments = await Comments.create(comment);

  const returnedData = { ...createComments, username: userName };
  res.json(returnedData);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const { commentId } = req.params;
  const deleteComment = await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json(deleteComment);
});

module.exports = router;
