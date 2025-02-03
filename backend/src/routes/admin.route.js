import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// at admin route it wil call the getAdmin function which is on admin.controller.js
// for that before that call the middleware functions
router.get("/", protectRoute, requireAdmin, createSong);

export default router;