import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getAllUsers } from "../controller/user.controller";

const router = Router();

router.get("/", protectRoute, getAllUsers);

// TODO: getMessages

export default router;