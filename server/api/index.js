const router = require("express").Router();
module.exports = router;
const Work = require("../db/models/Work");
const About = require("../db/models/About");
const { cloudinary } = require("../utils/cloudinary");
router.use("/users", require("./users"));

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "stackathon",
    });
    console.log("req.body.type", req.body.type);

    if (req.body.type === "about") {
      try {
        await About.update(
          {
            imgId: uploadedResponse.public_id,
          },
          {
            where: { userId: req.body.userId },
          }
        );
      } catch (error) {
        console.log(error, "about error");
      }
    } else {
      // let user = await user.findByPk(req.body.userId);
      await Work.create({
        imgId: uploadedResponse.public_id,
        userId: req.body.userId,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    // console.log(
    //   "uploadedResponse.publicId",
    //   uploadedResponse.publicId,
    //   "req.body.imgId",
    //   req.body.imgId
    // );

    let work = await Work.findOne({
      where: {
        imgId: req.body.imgId,
        userId: req.body.userId,
      },
    });

    // if req.body.data, then there is a new image, else, skip the image update and just update the data
    if (req.body.newImage) {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "stackathon",
      });

      await work.update({
        imgId: uploadedResponse.public_id,
        userId: req.body.userId,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    } else {
      await work.update({
        userId: req.body.userId,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

router.get("/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:stackathonImgs")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  } catch (error) {
    console.log("/api/index.js line 100", error);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
