const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const postRouter = require("./routes/Posts");
app.use(`/posts`, postRouter);

const commentsRouter = require("./routes/Comments");
app.use(`/comments`, commentsRouter);

const port = 3001;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server running on port: ${port}`);
  });
});
