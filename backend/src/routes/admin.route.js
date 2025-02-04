import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// writing everytime the middlewares for every single route, rather than will do this
router.use(protectRoute, requireAdmin);
// upper code removes writing the same code again and again

// to check that user is admin or not, if admin then only showing admin dashboard icon
router.get("/check", checkAdmin)

// at admin route it wil call the getAdmin function which is on admin.controller.js
// for that before that call the middleware functions
router.post("/songs", createSong);

// for delete song route and with that having middleware
router.delete("songs/:id", deleteSong);

// for creating album route and with that having middleware
router.post("/albums", createAlbum);

// for deleting album route and with that having middleware
router.delete("/albums/:id", deleteAlbum);

export default router;
