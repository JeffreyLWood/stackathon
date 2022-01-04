const router = require("express").Router();
module.exports = router;
const Work = require("../db/models/Work");
const { cloudinary } = require("../utils/cloudinary");
router.use("/users", require("./users"));

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "stackathon",
    });
    console.log("uploadedResponse", uploadedResponse);
    // let user = await user.findByPk(req.body.userId);
    await Work.create({
      imgId: uploadedResponse.public_id,
      userId: req.body.userId,
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

router.get("/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:stackathonImgs")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
