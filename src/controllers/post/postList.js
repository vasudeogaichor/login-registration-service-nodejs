const Post = require("../../models/Post");

module.exports = async function postList(req, res, next) {
  try {
    const { page, limit } = req.params;

    const defaultPage = 1;
    const defaultLimit = 10;

    skip = ((page || defaultPage) - 1) * (limit || defaultLimit);

    const posts = await Post.find()
      .skip(skip)
      .limit(limit || defaultLimit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      message: "Posts fetched successfully",
      total: (limit || defaultLimit),
      actualTotal: totalPosts,
      data: posts.map((post) => {
        return {
          postId: post._id,
          userId: post.userId,
          content: post.content,
          likes: post.likes,
          comments: post.comments,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
