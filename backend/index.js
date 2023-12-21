// index.js
const express = require("express");
const sequelize = require("./database/connection");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

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
