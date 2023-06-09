const express = require("express");
const cors = require("cors");
const app = express();
const productsController = require("./controllers/productsController");

app.use(cors());
app.use(express.json());

app.use("/products", productsController);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Glow Hive!");
});

app.get("*", (req, res) => {
  res.status(404).send("Opps this page can't bee found ...🐝");
});

module.exports = app;
