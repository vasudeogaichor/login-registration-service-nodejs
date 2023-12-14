const Post = require("../../models/Post");

module.exports = async function postCreate(req, res, next) {
  const { userId, content } = req.body;

  try {

    // Create a new post
    const post = new Post({ userId, content });

    // Save the post to the database
    await post.save();

    // Respond with a success message
    res.status(201).json({
      message: "Post created successfully.",
      data: {
        postId: post._id,
        userId: post.userId,
        content: post.content,
      },
    });
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
