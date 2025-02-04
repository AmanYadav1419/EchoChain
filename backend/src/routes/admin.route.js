import { Router } from "express";
import { createSong, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// at admin route it wil call the getAdmin function which is on admin.controller.js
// for that before that call the middleware functions
router.post("/songs", protectRoute, requireAdmin, createSong);

// for delete song route and function with having middleware
router.delete("songs/:id", protectRoute, requireAdmin, deleteSong)

export default router;