const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, password } = req.body;

  const exitingUser = await usermodel.findOne({ username });
  if (exitingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const user = await usermodel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res
    .status(201)
    .json({ message: "User registered successfully", user, token });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await usermodel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res
    .status(200)
    .json({ message: "Login successful", username: user.username });
}

module.exports = {
  registerController,
  loginController,
};
