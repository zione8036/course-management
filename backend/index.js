// index.js
const express = require("express");
const sequelize = require("./database/connection");
const routes = require("./routes");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api", routes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error occured:", error);
  });
