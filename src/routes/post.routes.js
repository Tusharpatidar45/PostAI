const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const createPostcontroller = require("../controllers/post.controller");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), createPostcontroller);

module.exports = router;
