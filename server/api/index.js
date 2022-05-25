const router = require("express").Router();
module.exports = router;
const Work = require("../db/models/Work");
const About = require("../db/models/About");
const Collection = require("../db/models/Collection");
const Contact = require("../db/models/Contact");
const { cloudinary } = require("../utils/cloudinary");

router.use("/users", require("./users"));

// Used for uploading images. Image data goes to Cloudinary, image information including Cloudinary link goes to DB
router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "stackathon",
    });

    //if req.body.type === about, send it to about table instead of work
    if (req.body.type === "about") {
      await About.update(
        {
          imgId: uploadedResponse.public_id,
          caption: req.body.caption,
        },
        {
          where: { userId: req.body.userId },
        }
      );
      let about = await About.findOne({ where: { userId: req.body.userId } });
      res.status(204).send(about);
    }
    //if req.body.type === contact, send it to about table instead of work
    if (req.body.type === "contact") {
      await Contact.update(
        {
          imgId: uploadedResponse.public_id,
          caption: req.body.caption,
        },
        {
          where: { userId: req.body.userId },
        }
      );
      let contact = await Contact.findOne({
        where: { userId: req.body.userId },
      });
      res.status(204).send(contact);
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
        depth: req.body.depth,
        metric: req.body.metric,
        status: req.body.status,
        price: req.body.price,
        description: req.body.description,
      });
    }
    let response = await Collection.findAll({
      where: { title: req.body.collection, userId: req.body.userId },
      include: Work,
    });

    res.status(200).send(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
});

// Use for reordering images by drag and drop in the CreateSnapshot
router.post("/reorder", async (req, res) => {
  try {
    await Work.bulkCreate(req.body.list, {
      updateOnDuplicate: ["order"],
    });

    let collection = await Collection.findOne({
      where: { title: req.body.collection, userId: req.body.userId },
    });

    let works = await Work.findAll({
      where: { collectionId: collection.id },
      order: [["order"]],
    });

    res.status(200).send(works);
  } catch (error) {
    console.log(error);
  }
});

// Used for updating artwork/artwork information from the Snapshot/Modal
router.post("/update", async (req, res) => {
  try {
    let origin = await Collection.findOne({
      where: { title: req.body.origin.collection, userId: req.body.userId },
    });

    let collection = await Collection.findOne({
      where: { title: req.body.collection, userId: req.body.userId },
    });

    let work = await Work.findOne({
      where: {
        imgId: req.body.imgId,
        collectionId: origin.id,
      },
    });
    let newWork = {};
    // if req.body.data, then there is a new image, else, skip the image update and just update the data
    if (req.body.newImage) {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "stackathon",
      });

      await Work.update(
        {
          imgId: uploadedResponse.public_id,
          collectionId: collection.id,
          // userId: req.body.userId,
          title: req.body.title,
          year: req.body.year,
          height: req.body.height,
          width: req.body.width,
          medium: req.body.medium,
          depth: req.body.depth,
          metric: req.body.metric,
          status: req.body.status,
          price: req.body.price,
          description: req.body.description,
        },
        { where: { imgId: req.body.imgId, collectionId: origin.id } }
      );
      newWork = await Work.findOne({
        where: { imgId: uploadedResponse.public_id },
      });
    } else {
      await Work.update(
        {
          // userId: req.body.userId,
          collectionId: collection.id,
          title: req.body.title,
          year: req.body.year,
          height: req.body.height,
          width: req.body.width,
          medium: req.body.medium,
          depth: req.body.depth,
          metric: req.body.metric,
          status: req.body.status,
          price: req.body.price,
          description: req.body.description,
        },
        { where: { imgId: req.body.imgId, collectionId: origin.id } }
      );
      work = await Work.findOne({ where: { imgId: req.body.imgId } });
    }
    // If request is switch collection, send back origin and destination collections
    if (req.body.origin && req.body.destination) {
      let origin = await Collection.findAll({
        where: { title: req.body.origin.collection, userId: req.body.userId },
        include: Work,
      });
      let destination = await Collection.findAll({
        where: {
          title: req.body.destination.collection,
          userId: req.body.userId,
        },
        include: Work,
      });
      origin = JSON.stringify(origin, null, 2);
      destination = JSON.stringify(destination, null, 2);
      console.log(work);

      if (req.body.newImage) {
        res.status(200).send({ work, newWork, origin, destination });
      } else {
        res.status(200).send({ work, origin, destination });
      }
    } else {
      if (req.body.newImage) {
        res.status(200).send({ work, newWork });
      } else {
        res.status(200).send({ work });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// Not sure this is still needed
router.get("/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:stackathonImgs")
      .delivery(format(auto()))
      .delivery(quality(auto()))
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
