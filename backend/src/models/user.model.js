// this file for user model / schema

import mongoose from "mongoose";

// created a user schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    //   this is asscoated with clerk id as user id
    clerkID: {
      type: String,
      require: true,
      unique: true,
    },
  },
  //   it will add createdAt and updatedAt by default using timestamp true
  { timestamps: true }
);

// export this userSchema in model , so we can use it later
export const User = mongoose.model("User", userSchema);