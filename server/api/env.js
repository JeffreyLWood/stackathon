const router = require("express").Router();
const { cloudinary } = require("../utils/cloudinary");
const res = require("express/lib/response");
require("dotenv").config();

module.exports = router;
router.get("/", (req, res, next) => {
  res.send(
    `${process.env.MAILJS_SERVICE_ID} ${process.env.MAILJS_TEMPLATE_ID} ${process.env.MAILJS_USER_ID}`
  );
});
