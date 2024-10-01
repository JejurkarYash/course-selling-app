const { Router } = require("express");
const { adminModel, courseModel } = require("../DB/db");
const adminRouter = Router();
const adminMiddleware = require("../auth/admin");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const response = await adminModel.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
  });
  if (response) {
    res.send({
      message: "admin signup succesfully",
    });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await adminModel.findOne({
    email,
  });

  if (user) {
    const pass = await bcrypt.compare(password, user.password);
    console.log(pass);
    if (pass) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_ADMIN_SECRET
      );

      res.status(200).send({
        token,
      });
    }
  } else {
    res.status(404).send({
      message: "User not found",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, descripton, price, imageURL } = req.body;

  const createCourse = await courseModel.create({
    creatorId: adminId,
    title: title,
    descrition: descripton,
    price: price,
    imageURL: imageURL,
  });
  if (createCourse) {
    res.send({
      message: "Course Created Succesfully ",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, descripton, price, imageURL, courseId } = req.body;
  const updateCourse = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      descrition: descripton,
      price: price,
      imageURL: imageURL,
    }
  );

  if (updateCourse) {
    res.send({
      message: "Course Updated Sucessfully",
      courseId: courseId,
    });
  } else {
    res.send({
      message: "Course does not found",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  if (courses) {
    res.send(courses);
  }
});

module.exports = {
  adminRouter,
};
