// Import the Router module from Express to handle routes
import { Router } from "express";

// Import the middleware to protect routes (ensures only authenticated users can access)
import { protectRoute } from "../middleware/auth.middleware.js";

// Import controller functions that handle user-related requests
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router();

// Define a route to get all users, applying the protectRoute middleware for authentication
router.get("/", protectRoute, getAllUsers);
// Define a route to get messages for a specific user, using protectRoute middleware
router.get("/messages/:userId", protectRoute, getMessages);

export default router;