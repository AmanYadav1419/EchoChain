import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";
const router = Router();

// to get all the albums
router.get("/", getAllAlbums);

// to get the specific albums
router.get("/:albumId", getAlbumById);

export default router;
