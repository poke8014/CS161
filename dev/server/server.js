const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8080

const { db_url } = require("../config/config.json");
const userRouter = require('./routes/users');
const audioRouter = require('./routes/audioFiles');
const refresh = require("./routes/refresh")

const cookieParser = require("cookie-parser")

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

app.use(express.json());
app.use('/users', userRouter);
app.use('/audioFiles', audioRouter);

// refresh token
app.use('/refresh', refresh);

async function connect() {
  try {
    await mongoose.connect(String(db_url));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
