import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// route to get all the songs, and only admin can get all songs
router.get("/", protectRoute, requireAdmin, getAllSongs);

// route to get the featured songs
router.get("/featured",  getFeaturedSongs);

// route to get made for you songs
router.get("/made-for-you",  getMadeForYouSongs);

// route to get trending songs
router.get("/trending",  getTrendingSongs);

export default router;