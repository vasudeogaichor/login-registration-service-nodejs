const Post = require("../../models/Post");

module.exports = async function postList(req, res, next) {
  try {
    let { page, limit } = req.query;

    const defaultPage = 1;
    const defaultLimit = 10;

    page = parseInt(page) || defaultPage;
    limit = parseInt(limit) || defaultLimit;

    skip = (page - 1) * limit;

    const posts = await Post.find().skip(skip).limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      message: "Posts fetched successfully",
      total: limit,
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
