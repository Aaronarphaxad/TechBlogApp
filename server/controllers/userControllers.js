// userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get one user using the token
exports.getSingleUser = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    // Verify the token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Exclude sensitive information (like password) before sending the response
    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      bio: user.bio,
      isAdmin: user.isAdmin,
    };

    res.json(sanitizedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      // Handle token expiration error
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      // Handle invalid token error
      return res
        .status(401)
        .json({ error: "Invalid token. Please log in again." });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user with hashed password
    const newUser = new User({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(201).json({ ...newUser, token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, fullName, bio, avatarUrl } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user properties
    user.username = username;
    user.fullName = fullName;
    user.bio = bio;
    user.avatarUrl = avatarUrl;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body;

    // Hash the new password before updating it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // If the password matches, create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    // Send the token as the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create Admin user (only ran once)
// exports.createAdminUser = async (req, res) => {
//   const username = "admin";
//   const email = "admin@example.com";
//   const fullName = "Admin User";
//   const password = "adminpassword";
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const adminUser = new User({
//     username,
//     email,
//     fullName,
//     password: hashedPassword,
//     isAdmin: true,
//   });

//   try {
//     await adminUser.save();
//     res.json({ message: "Admin user created" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
