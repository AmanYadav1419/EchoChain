import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

// this route is protectroute need to login and should be an admin to use this route
router.get("/", protectRoute, requireAdmin, getStats);

export default router;
