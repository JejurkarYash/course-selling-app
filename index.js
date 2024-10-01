const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const cors = require("cors");

app.use(cors());

require("dotenv").config();

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

function main() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("Connected to database"));
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
