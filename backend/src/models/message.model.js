// this model / schema is for storing and retrving chat history of messages from database

import mongoose from "mongoose";

// created message Schema
const messageSchema = new mongoose.Schema(
  {
    // each message has one sender id and one receiver id
    senderId: {
      // as sender Id is clerk user ID
      type: String,
      required: true,
    },
    receiverId: {
      // as receiver Id is clerk user ID
      type: String,
      required: true,
    },
    // for message content
    content: {
      type: String,
      required: true,
    },
  }, // it will add createdAt and updatedAt by default using timestamp true
  { timestamps: true }
);

// export this messageSchema in model , so we can use it later
export const Message = mongoose.model("Message", messageSchema);

// video start from 44:30