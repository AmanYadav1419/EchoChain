// this is a controller file for album
// all the code realted to album route will be written here

import { Song } from "../models/song.model.js";

// function to get all the songs
export const getAllSongs = async (req, res, next) => {
  try {
    // to get all the songs from database
    // sort them with -1 = Descending i.e at top is newest one to oldest one
    // 1 = Ascending => oldest -> newest
    const songs = await Song.find().sort({ createdAt: -1 });

    res.json(songs);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};

// function to get featured songs
// in future we can make this with ml, for now it will done by mongodb's aggregation
export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        // fetch 6 different items
        $sample: { size: 6 },
      },
      // we get the feilds
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs that we fetched
    res.json(songs);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};

// function to get the made for you songs
// in future we can make this with ml, for now it will done by mongodb's aggregation
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 4 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        // fetch 4 different items
        $sample: { size: 4 },
      },
      // we get the feilds
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs that we fetched
    res.json(songs);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};

// function to get trending songs
// in future we can make this with ml, for now it will done by mongodb's aggregation
export const getTrendingSongs = async (req, res, next) => {
  try {
    // fetch 4 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        // fetch 4 different items
        $sample: { size: 4 },
      },
      // we get the feilds
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs that we fetched
    res.json(songs);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};

// video start from 1:49:40