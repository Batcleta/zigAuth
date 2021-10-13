const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("area do usuário");
});

module.exports = router;
