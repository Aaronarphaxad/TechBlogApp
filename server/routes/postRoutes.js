const express = require("express");
const router = express.Router();
const { Post } = require("../models.js");
const postController = require("../controllers/postController.js");

// Get all posts
router.get("/getAllPosts", postController.getAllPosts);

// Get a specific post by ID
router.get("/post/:id", postController.getPostById);

// Create a new post
router.post("/newPost", postController.createPost);

// Update a post by ID
router.put("/updatePost/:id", postController.updatePost);

// Delete a post by ID
router.delete("/deletePost/:id", postController.deletePost);

// Get posts by user ID (user-related posts)
router.get("/postsByUser/:userId", postController.getPostsByUserId);

// Get posts by category
router.get("/postsByCategory/:category", postController.getPostsByCategory);

// Get all unique categories
router.get("/uniqueCategories", postController.getUniqueCategories);

module.exports = router;
