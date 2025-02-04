// this is a controller file for admin route
// all the code realted to admin route will be written here
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// it will handle the uploading files to cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      // it will auto identifies the file/resource type
      resource_type: "auto",
    });
    // after uploading it will give us the url
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

// function to create song
export const createSong = async (req, res, next) => {
  try {
    // if the required requested file doesn't exists
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      // return the error or return the message
      return res.status(400).json({ message: "Please upload all the files" });
    }

    // if get the files and data , then destructre it from req.body
    const { title, artist, albumId, duration } = req.body;
    // for audio file
    const audioFile = req.files.audioFile;
    // for image file
    const imageFile = req.files.imageFile;

    // to upload audio and image to cloudinary
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // create the new song, with all the parameters passed to it
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      // if albumId is present then it will albumId or if it is not then it will null
      albumId: albumId || null,
    });

    // save the song to database
    await song.save();

    // if the song belongs to an album, update the album's song array
    if (albumId) {
      await Album.findOneAndUpdate(albumId, {
        // push the newly created song which is belong to album
        $push: {
          songs: song._id,
        },
      });
    }
    // status 201 => resource has been created
    res.status(201).json(song);
  } catch (error) {
    console.log("Error in CreateSong", error);
    // this would handle the error i.e we will create error handler middleware
    next(error);
  }
};

// function to delete song
export const deleteSong = async (req, res, next) => {
  try {
    // extract the id from req.params
    const { id } = req.params;

    // find the song by id in database
    const song = await Song.findById(id);

    // if song belongs to an album, update the album's song array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // then delete the song by id
    await song.findByIdAndUpdate(id);
    // then send the status code
    res.send(200).json({ message: "Song Deleted Sucessfully" });
  } catch (error) {
    console.log("Error in delete Song", error);
    // error handler middleware
    next(error);
  }
};

// function to create album
export const createAlbum = async (req, res, next) => {
  try {
    // get all the data from req.body
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    // convert the image file to the url
    const imageUrl = await uploadToCloudinary(imageFile);

    // we have the data , then create the album now
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    // now album save to database
    await album.save();

    // then send the res status code
    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    // error handler middleware
    next(error);
  }
};

// function to delete album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    // as when we delete album, we delete all the songs which is present in album by finding it by id
    await Song.deleteMany({ albumId: id });

    // then we can simply delete the album by finding it by id
    await Album.findByIdAndDelete(id);

    // then send the res status code
    res.status(200).json({ message: "Album Deleted Sucessfully" });
  } catch (error) {
    console.log("Error in deleting Album", error);
    // error handler middleware
    next(error);
  }
};

// to check user is admin or not
// if user is admin then only showing the admin dashboard, for that this is a fn
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};

