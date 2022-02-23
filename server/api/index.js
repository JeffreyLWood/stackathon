const router = require("express").Router();
module.exports = router;
const Work = require("../db/models/Work");
const About = require("../db/models/About");
const Collection = require("../db/models/Collection");
const { cloudinary } = require("../utils/cloudinary");
const res = require("express/lib/response");
router.use("/users", require("./users"));

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "stackathon",
    });

    //if req.body.type === about, send it to about table instead of work
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
      let collection = await Collection.findOne({
        where: { userId: req.body.userId, title: req.body.collection },
      });
      await Work.create({
        imgId: uploadedResponse.public_id,
        collectionId: collection.id,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    }
    let response = await Collection.findAll({
      where: { title: req.body.collection, userId: req.body.userId },
      include: Work,
    });
    console.log(JSON.stringify(response, null, 2));
    res.status(200).send(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    let collection = await Collection.findOne({
      where: { title: req.body.collection, userId: req.body.userId },
    });

    let work = await Work.findOne({
      where: {
        imgId: req.body.imgId,
        // collectionId: collection.id,
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
        collectionId: collection.id,
        // userId: req.body.userId,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    } else {
      await work.update({
        // userId: req.body.userId,
        collectionId: collection.id,
        title: req.body.title,
        year: req.body.year,
        height: req.body.height,
        width: req.body.width,
        medium: req.body.medium,
        hidden: req.body.hidden,
      });
    }
    res.status(200).send(work);
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
