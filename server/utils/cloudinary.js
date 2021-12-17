require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = { cloudinary };
