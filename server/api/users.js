const router = require("express").Router();
const { text } = require("express");
const {
  models: { User, About, Contact, CV, Work, Collection },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

//change a user's site title
router.put("/:userId/title", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);

    await user.update({ siteTitle: req.body.title });
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/about", async (req, res, next) => {
  try {
    await About.update(
      {
        text: req.body.aboutText,
        userId: req.params.userId,
      },
      { where: { userId: req.params.userId } }
    );
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cv", async (req, res, next) => {
  try {
    await CV.update(
      {
        [req.body.header]: req.body.text,
      },
      { where: { userId: req.params.userId } }
    );
    let cvData = await CV.findOne({
      where: { userId: req.params.userId },
    });
    res.status(200).send(cvData);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/contact", async (req, res, next) => {
  try {
    await Contact.update(
      {
        text: req.body.text,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        etsy: req.body.etsy,
        pinterest: req.body.pinterest,
        tiktok: req.body.tiktok,
      },
      { where: { userId: req.params.userId } }
    );
    let contactData = await Contact.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).send(contactData);
  } catch (err) {
    next(err);
  }
});

// Get User Data
router.get("/:username", async (req, res, next) => {
  try {
    let allData = await User.findOne({
      where: { username: req.params.username },
      include: { all: true, nested: true },
    });

    let userData = {
      id: allData.dataValues.id,
      userName: allData.dataValues.username,
      siteTitle: allData.dataValues.siteTitle,
      email: allData.dataValues.email,
      firstName: allData.dataValues.firstName,
      lastName: allData.dataValues.lastName,
      about: allData.dataValues.about,
      contact: allData.dataValues.contact,
      cv: allData.dataValues.cv,
      collections: allData.dataValues.collections,
    };

    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
});

//Get all work by a user
router.get("/:userId/work", async (req, res, next) => {
  try {
    let workData = await Collection.findAll({
      where: {
        userId: req.params.userId,
      },
      include: { all: true, nested: true },
    });
    res.status(200).send(workData);
  } catch (err) {
    next(err);
  }
});

//Get all work in a collection by a user
router.get("/:userId/:title/work", async (req, res, next) => {
  try {
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.title },
    });
    let workData = [];

    if (collection) {
      console.log(collection.id);
      workData = await Work.findAll({
        where: { collectionId: collection.id },
      });
      res.status(200).send(workData);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    next(err);
  }
});

// Get single work by a user
router.get("/:userId/:collection/:imgId", async (req, res, next) => {
  try {
    let prefix = "stackathonImgs";
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
    });
    let workData = await Work.findOne({
      where: {
        imgId: `${prefix}/${req.params.imgId}`,
        collectionId: collection.id,
      },
    });

    res.status(200).send(workData);
  } catch (err) {
    next(err);
  }
});

//Make new Collection
router.post("/:userId", async (req, res, next) => {
  try {
    await Collection.create({
      title: req.body.title,
      description: req.body.description,
      hidden: req.body.hidden,
      userId: req.params.userId,
    }),
      res.status(200).send();
  } catch (err) {
    next(err);
  }
});

// Delete a work by a user
router.delete("/:userId/:collectionId/:imgId", async (req, res, next) => {
  try {
    let prefix = "stackathonImgs";
    await Work.destroy({
      where: {
        imgId: `${prefix}/${req.params.imgId}`,
        collectionId: req.params.collectionId,
        userId: req.params.userId,
      },
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});
