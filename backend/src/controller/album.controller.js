// this is a controller file for album
// all the code realted to album route will be written here
import {Album} from "../models/album.model.js";

// function to get all the albums
export const getAllAlbums = async (req, res, next) => {
  try {
    // get all the albums
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};

// function to get the specific album by id
export const getAlbumById = async (req, res, next) => {
  try {
    // first get the album id
    const { albumId } = req.params;

    // find the album by its id
    // then fetch all songs present in the album , thats why populate("songs")
    // as this "songs" coming from album.model.js file , songs is an array of id's
    const album = await Album.findById(albumId).populate("songs");

    // if album not there
    if (!album) {
      return res.status(404).json({ message: "Album not Found" });
    }

    // if album find sucessfully
    res.status(200).json(album);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};
