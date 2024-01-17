// postController.js
const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostByHref = async (req, res) => {
  try {
    const postHref = req.body.href;
    const post = await Post.findOne({ href: postHref });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, photoUrl, body, category, userId, author } = req.body;

  try {
    if (!title || !body || !category || !userId || !author) {
      // Check if required fields are missing
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Post({
      title,
      photoUrl,
      body,
      category,
      userId,
      author,
    });

    const post = await newPost.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    // Check for specific errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, photoUrl, body, category } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, photoUrl, body, category, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userPosts = await Post.find({ userId });
    res.json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const postsByCategory = await Post.find({ category });
    res.json(postsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUniqueCategories = async (req, res) => {
  try {
    const uniqueCategories = await Post.distinct("category");
    res.json(uniqueCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
