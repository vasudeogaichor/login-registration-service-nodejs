const Post = require("../../models/Post");

module.exports = async function postUpdate(req, res, next) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { $set: { content } },
      { new: true }
    );

    res.status(201).json({
      message: "Post updated successfully",
      data: {
        postId: updatePost._id,
        userId: updatePost.userId,
        content: updatePost.content,
        likes: updatePost.likes,
        comments: updatePost.comments,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
