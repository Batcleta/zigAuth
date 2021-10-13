const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

// const posts = (app, router) => {
//   const postRouter = require("./Posts")(router);
//   app.use(`/posts`, postRouter);
// };

// export const comments = (app, router) => {
//   const commentsRouter = require("./Comments")(router);
//   app.use(`/Comments`, commentsRouter);
// };

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
