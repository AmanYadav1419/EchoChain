// this file is for uploading images and audio files to cloudinary

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// configure the dotenv package to use .env file secret keys
dotenv.config();

// configure the cloduinary object with required env files
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;