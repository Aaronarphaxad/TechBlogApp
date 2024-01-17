// routes.js
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

// Define routes with /api/ prefix
router.use("/api", userRoutes);
router.use("/api", postRoutes);

module.exports = router;
