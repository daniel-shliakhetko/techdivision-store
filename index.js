const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = config.get("port");

mongoose
  .connect(config.get("mongoDB"), {})
  .then(() => {
    console.log("Connected DB...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Listening ${PORT}...`);
});

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/user.routes"));
