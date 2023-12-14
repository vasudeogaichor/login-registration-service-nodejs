const Post = require("../../models/Post");

module.exports = async function postCreate(req, res, next) {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    res.status(200).json({
      message: "Post fetched successfully",
      data: {
        postId: post._id,
        userId: post.userId,
        content: post.content,
        likes: post.likes,
        comments: post.comments,
      },
    });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
