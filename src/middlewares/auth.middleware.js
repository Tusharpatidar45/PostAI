const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = usermodel.findOne({
      _id: decoded._id,
    });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token, please login again",
    });
  }
}

module.exports = authMiddleware;
