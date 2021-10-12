const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

module.exports = (app, router) => {
  const postRouter = require("./Posts")(router);
  //   const userRouter = require("./Users")(router);
  app.use(`/posts`, postRouter);

  //   app.use(`/users`, userRouter);

  //   fs.readdirSync(__dirname)
  //     .filter((file) => {
  //       return (
  //         file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  //       );
  //     })
  //     .forEach((file) => {
  //       const routeName = `/${file.split(".")[0].toLocaleLowerCase()}`;
  //       const posts = require(path.join(__dirname, file))(router);
  //       app.use(routeName, posts);
  //     });
};
