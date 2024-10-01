const { Router } = require("express");
const mongoose = require("mongoose");
const { userModel, purchaseModel, courseModel } = require("../DB/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = Router();
const JSW_USER_SECRET = "jwt_user_secret";
const userMiddleware = require("../auth/user");
userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const response = await userModel.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });

    if (response) {
      res.json({
        message: "Signup Successfully",
        user: req.body.email,
      });
    }
  } catch (error) {
    res.status(409).send({
      message: " User Already Exist",
    });
    return;
  }
});

userRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  const user = await userModel.findOne({
    email: email,
  });
  if (user) {
    const validatePassword = await bcrypt.compare(password, user.password);
    console.log(validatePassword);
    if (validatePassword) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JSW_USER_SECRET
      );

      res.status(200).send({
        token,
      });
    } else {
      res.send({
        message: " Invalid Password",
      });
    }
  } else {
    res.status(404).send({
      message: "User Not Found",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchaseCourse = await purchaseModel.find({
    userId: userId,
  });
  if (purchaseCourse) {
    const courses = courseModel.find({
      _id: { $in: purchaseCourse.map((c) => c.courseId) },
    });
  }
  res.send({
    message: "Purchased Coursed",
  });
});

module.exports = {
  userRouter,
};
