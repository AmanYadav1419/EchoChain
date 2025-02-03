// this file for album model / schema

import mongoose from "mongoose";

// created a album schema
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      require: true,
    },
    // each album had some songs so for that, i.e it is an array of objects
    songs: [
      {
        // as this type is a reference to the song model
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  // it will add createdAt and updatedAt by default using timestamp true
  { timestamps: true }
);

// export this albumSchema in model , so we can use it later
export const Album = mongoose.model("Album", albumSchema);
