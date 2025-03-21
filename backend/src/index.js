// this file is the entry point for the backend part

import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { createServer } from "http";

import { initializeSocket } from "./lib/socket.js";
// import the routes

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

// after doing / caling this function we can run env file values
dotenv.config();

const __dirname = path.resolve();
// call the express function and save it to in variable app
const app = express();

// Assigns the PORT value from environment variables, allowing flexibility in deployment
const PORT = process.env.PORT;

// Creates an HTTP server using the Express app
const httpServer = createServer(app);

// Initializes WebSocket communication on the created HTTP server
initializeSocket(httpServer);

app.use(cors(
  {
    origin:"http://localhost:3000",
    credentials:true,
  }
));

// to parse req.body
// Returns middleware that only parses json data
app.use(express.json());

// it will add auth to req object
app.use(clerkMiddleware());

// this is act as an middleware for uploading file
app.use(
  fileUpload({
    // use temp files true
    useTempfiles: true,
    // it will create the temp folder to store the temporary data i.e audio and image
    // upto the audio and image data is get uploaded to cloudinary
    tempFileDir: path.join(__dirname, "tmp"),
    // and if the tmp folder doesn't exists it will create that, like for the first time
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);


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

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// error handler middleware
app.use((err, req, res, next) => {
  // modify the error message according to production and development mode
  res.status(500).json({
    messgae:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.messgae,
  });
});
httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  // to conect with database when the backend app starts running
  connectDB();
});
