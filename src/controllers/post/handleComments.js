const Post = require("../../models/Post");

module.exports = async function handleComments(req, res, next) {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { userId, text, action, commentId } = req.body;

    if (action === "add") {
      post.comments.push({ userId, text });
      await post.save();

      res.locals.json = {
        message: "Comment added successfully",
        data: {
          postId: post._id,
          userId: post.userId,
          content: post.content,
          likes: post.likes,
          comments: post.comments,
        },
      };
      res.status(201);
    } else if (action === "remove" && commentId) {
      const commentIndex = post.comments.findIndex((comment) =>
        comment._id.equals(commentId)
      );

      if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        res.locals.json = {
          message: "Comment removed successfully",
          data: {
            postId: post._id,
            userId: post.userId,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
          },
        };
        res.status(201);
      } else {
        return res.status(404).json({ message: "Comment not found" });
      }
    } else {
      return res.status(400).json("Error: Invalid action or commentId missing");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  next();
};
