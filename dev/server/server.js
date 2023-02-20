const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000

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

app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
