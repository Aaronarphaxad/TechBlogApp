const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");

// Get all users
router.get("/users", userController.getAllUsers);

// Create a new user
router.post("/newUser", userController.createUser);

// Get a single user by ID
router.get("/user", userController.getSingleUser);

// Update a user by ID
router.put("/user/:id", userController.updateUser);

// Change user's password by ID
router.put("/user/:id/changePassword", userController.changePassword);

// User login endpoint
router.post("/login", userController.login);

// Delete a user by ID
router.delete("/user/:id", userController.deleteUser);

// create admin user (route used once)
// router.get("/createAdmin", userController.createAdminUser);

module.exports = router;
