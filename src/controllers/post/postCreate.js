const Post = require("../../models/Post");

module.exports = async function postCreate(req, res, next) {
  const { userId, content } = req.body;

  try {
    const post = new Post({ userId, content });

    await post.save();

    res.locals.json = {
      message: "Post created successfully.",
      data: {
        postId: post._id,
        userId: post.userId,
        content: post.content,
      },
    };

    res.status(201);
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
  next();
};
