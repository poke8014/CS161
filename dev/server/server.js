const express = require("express");
const mongoose = require("mongoose");
const app = express();

const {db_url} = require("../config/config.json");

async function connect() {
  try {
    await mongoose.connect(String(db_url));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
