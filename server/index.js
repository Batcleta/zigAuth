const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require("./routes/index")(app, router);

const port = 3001;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server running on port: ${port}`);
  });
});
