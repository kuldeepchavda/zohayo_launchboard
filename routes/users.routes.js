const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.ctrl");

// Get all users
router.get("/users", userController.getUsers);

// Get a single user by ID
router.get("/users/:id", userController.getUserById);

// Create a new user
router.post("/users", userController.createUser);

// Update a user
router.put("/users/:id", userController.updateUser);

// Delete a user
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
