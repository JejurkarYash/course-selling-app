const jwt = require("jsonwebtoken");
require("dotenv").config();
const JSW_USER_SECRET = process.env.JSW_USER_SECRET;

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const user = jwt.verify(token, JSW_USER_SECRET);
  if (user) {
    
    res.userId = user.id;
    next();
  } else {
    res.send({
      message: "token is invalid",
    });
  }
}

module.exports = userMiddleware;
