// this file is the entry point for the backend part

import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express'

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

// after doing / caling this function we can run env file values
dotenv.config();

// call the express function and save it to in variable app
const app = express();
const PORT = process.env.PORT;

// to parse req.body
// Returns middleware that only parses json data
app.use(express.json());

// it will add auth to req object
app.use(clerkMiddleware())

// if user hit the api route , then run userRoutes function, present in routes folder
app.use("/api/users", userRoutes);

// authentication route
app.use("/api/auth", authRoutes);

// admin route
app.use("/api/admin", adminRoutes);

// songs route
app.use("/api/songs", songRoutes);

// albums route
app.use("/api/albums", albumRoutes);

// statitics route
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  // to conect with database when the backend app starts running
  connectDB();
});
