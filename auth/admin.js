const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminMiddleware(req, res, next) {
  const token = req.headers.token;

  const user = jwt.verify(token, JWT_ADMIN_SECRET);

  if (user) {
    req.adminId = user.id;
    next();
  } else {
    res.send({
      message: " Invalid User",
    });
  }
}

module.exports = adminMiddleware;
