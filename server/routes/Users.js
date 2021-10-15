const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    })
      .then((resp) => res.json({ message: "uhu, foi" }))
      .catch((err) => res.json({ error: err }));
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // check if the user exists.
  // In case of it exists, return the user object and store it in "user"
  const user = await Users.findOne({ where: { username: username } });
  // if dont exist, return an error message
  if (!user) res.json({ error: "Usuário não existe" });
  // using bcrypt to compare the to passwords, the new inputed and the one stored in "user"
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({
        error: "A senha informada nao corresponde com a cadastrada",
      });
    }

    const apiKey = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ apiKey: apiKey, username: user.username, id: user.id });
  });
});

router.get("/auth", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
