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

    res.status(200).send(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
});

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
    // If request is switch collection, send back origin and destination collections
    if (req.body.origin) {
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
      res.status(200).send({ work, origin, destination });
    } else {
      console.log(work.dataValues);
      res.status(200).send(work.dataValues);
    }
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

router.post("/collections", async (req, res) => {
  try {
    let newCollection = await Collection.create({
      userId: req.body.userId,
      title: "New Collection",
    });
    let allCollections = await Collection.findAll({
      where: { userId: req.body.userId },
    });

    res.status(200).send({ newCollection, allCollections });
  } catch (error) {
    console.log("/api/collections", error);
  }
});

//Toggle hide and show collection
router.put("/collections/:userId/:collection/hide", async (req, res) => {
  try {
    await Collection.update(
      {
        hidden: req.body.toggle,
      },
      { where: { userId: req.params.userId, title: req.params.collection } }
    );
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
      include: Work,
    });

    // let collections = await Collection.findAll({
    //   where: { userId: req.params.userId },
    //   include: Work,
    // });

    res.status(200).send(collection);
  } catch (error) {
    console.log(error);
  }
});

router.put("/collections/:userId/:collection", async (req, res) => {
  try {
    await Collection.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      { where: { userId: req.params.userId, title: req.params.collection } }
    );
    // let collection = await Collection.findOne({
    //   where: { userId: req.params.userId, title: req.body.title },
    // });
    let newCollection = await Collection.findAll({
      where: { userId: req.params.userId, title: req.body.title },
      include: Work,
    });
    let collections = await Collection.findAll({
      where: { userId: req.params.userId },
      include: Work,
    });
    // response = JSON.stringify(response, null, 2);

    res.status(200).send({ newCollection, collections });
  } catch (error) {
    console.log("/api/collections", error);
  }
});

router.delete("/collections/:userId/:collection", async (req, res) => {
  try {
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
    });
    await Collection.destroy({
      where: {
        userId: req.params.userId,
        id: collection.id,
      },
      include: Work,
    });
    let collections = await Collection.findAll({
      where: { userId: req.params.userId },
      include: Work,
    });
    res.status(202).send({ collections, collection });
  } catch (error) {
    console.log("/api/collections", error);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
