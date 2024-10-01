const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const objectId = Schema.ObjectId;
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  creatorId: objectId,
  title: String,
  descritption: String,
  price: Number,
  discount: Number,
  imageURL: String,
});

const adminSchma = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const purchaseSchema = new Schema({
  userId: objectId,
  courseId: objectId,
});

const userModel = mongoose.model("users", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchma);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  courseModel,
  adminModel,
  purchaseModel,
};
