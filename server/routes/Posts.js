const { Posts } = require("../models");
module.exports = (router) => {
  router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  });

  router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  });

  return router;
};
