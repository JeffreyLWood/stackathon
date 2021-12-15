const router = require("express").Router();
module.exports = router;
const { cloudinary } = require("../utils/cloudinary");
router.use("/users", require("./users"));

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "stackathon",
    });
    console.log("backend", uploadedResponse);
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

router.get("/images/", async (req, res) => {});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
