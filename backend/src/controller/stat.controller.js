// this is a controller file for stat
// all the code realted to stat route will be written here.

import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    // to get the total counts of songs, albums, users in more optimised way
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),

      // for uniqueArtists we need to aggregate some data
      //   fetch all the songs,albums and combine them
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        // then group them with unique artist
        {
          $group: {
            _id: "$artist",
          },
        },
        // and then count number of aritist
        {
          $count: "count",
        },
      ]),
    ]);

    // then send it as res
    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      // get the first artist count and if count not there then return 0
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    // error handling middleware
    next(error);
  }
};
