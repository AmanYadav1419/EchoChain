import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js";

const router = Router();

// at admin route it wil call the getAdmin function which is on admin.controller.js
router.get("/", getAdmin)

export default router;