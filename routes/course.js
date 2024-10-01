const { Router } = require("express");
const userMiddleware = require("../auth/user.js");
const { purchaseModel, courseModel, adminModel } = require("../DB/db.js");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const purchaseCourse = await purchaseModel.create({
    userId: userId,
    courseId: courseId,
  });
  if (purchaseCourse) {
    res.send({
      message: "Course Purchase succesfully",
    });
  } else {
    message: " failed to purchase course";
  }
});
courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({}); // Fetch all courses

    if (!courses || courses.length === 0) {
      return res.status(404).send({ message: "No courses found" });
    }

    // Fetch creators based on creatorId in courses
    const creators = await adminModel.find({
      _id: { $in: courses.map((course) => course.creatorId) },
    });

    // Map over courses and find corresponding creators
    const coursesPreview = courses.map((course) => {
      const creator = creators.find((creator) =>
        creator._id.equals(course.creatorId)
      );
      console.log(course);
      return {
        title: course.title,
        author: creator
          ? `${creator.firstName} ${creator.lastName}`
          : "Unknown Author",
        price: course.price,
        description: course.descritption,
      };
    });

    res.status(200).send(coursesPreview);
  } catch (error) {
    console.error("Error fetching courses: ", error);
    res.status(500).send({ message: "Failed to load courses" });
  }
});

module.exports = {
  courseRouter,
};
