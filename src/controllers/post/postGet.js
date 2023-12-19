const Post = require("../../models/Post");

module.exports = async function postCreate(req, res, next) {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    res.locals.json = {
      message: "Post fetched successfully",
      data: {
        postId: post._id,
        userId: post.userId,
        content: post.content,
        likes: post.likes,
        comments: post.comments,
      },
    };
    res.status(200);
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }

  next();
};
