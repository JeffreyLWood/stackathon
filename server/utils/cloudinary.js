require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "jeffreywood",
  api_key: 785875157211581,
  api_secret: "OapjHtvsqUIzuLpBbjTgK-Vj3I8",
});

module.exports = { cloudinary };

// CLOUDINARY_API_KEY=
// CLOUDINARY_API_SECRET= OapjHtvsqUIzuLpBbjTgK-Vj3I8
// CLOUDINARY_NAME=jeffreywood
