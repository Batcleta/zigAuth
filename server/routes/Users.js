module.exports = (router) => {
  router.get("/", (req, res) => {
    res.send("area do usuário");
  });

  return router;
};
