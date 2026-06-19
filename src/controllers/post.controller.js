const postModel = require("../models/post.model");
const getCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");
async function createPostcontroller(req, res) {
  const file = req.file;

  const base64Image = new Buffer.from(file.buffer).toString("base64");

  const Caption = await getCaption(base64Image);

  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    caption: Caption,
    image: result.url,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Post created successfully",
    caption,
    post,
  });
}
module.exports = createPostcontroller;
