// this file for song model / schema

import mongoose from "mongoose";

// created a song schema
const songSchema = new mongoose.Schema(
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
    audioUrl: {
      type: String,
      required: true,
    },
    // as duration in seconds thats why type is in Number
    duration: {
      type: Number,
      required: true,
    },
    // as this is optional feild, so we don't write required : true
    albumId: {
      // as this type is a reference to the album model
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: false,
    },
  }, // it will add createdAt and updatedAt by default using timestamp true
  { timestamps: true }
);

// export this userSchema in model , so we can use it later
export const Song = mongoose.model("Song", songSchema);
