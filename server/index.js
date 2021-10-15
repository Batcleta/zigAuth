const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const postRouter = require("./routes/Posts");
// app.use(`/posts`, postRouter);

// const commentsRouter = require("./routes/Comments");
// app.use(`/comments`, commentsRouter);

// routes - inclusão automática

fs.readdirSync(path.join(__dirname, "routes"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const routeName = `/${file.split(".")[0].toLocaleLowerCase()}`;
    const posts = require(path.join(__dirname, "routes", file));
    app.use(routeName, posts);
  });

const port = 3001;
db.sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  });
