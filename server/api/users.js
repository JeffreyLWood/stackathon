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

router.put("/:userId/username", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);
    await user.update({
      username: req.body.newUsername,
    });
    await user.save();
    res.status(200).send(user);
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
        header: req.body.header,
        userId: req.params.userId,
        caption: req.body.caption,
      },
      { where: { userId: req.params.userId } }
    );
    let about = await About.findOne({ where: { userId: req.params.userId } });
    res.status(200).send(about);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/about", async (req, res, next) => {
  try {
    await About.update(
      {
        imgId: null,
      },
      { where: { userId: req.params.userId } }
    );
    let about = await About.findOne({ where: { userId: req.params.userId } });
    res.status(200).send(about);
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

router.delete("/:userId/cv", async (req, res, next) => {
  try {
    await CV.update(
      {
        imgId: null,
      },
      { where: { userId: req.params.userId } }
    );
    let cv = await CV.findOne({ where: { userId: req.params.userId } });
    res.status(200).send(cv);
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

router.get("/custom/:customDomain", async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        domain: req.params.customDomain,
      },
      include: [
        {
          separate: true,
          model: Collection,
          order: [["order", "ASC"]],
          include: { model: Work, separate: true, order: [["order", "ASC"]] },
        },
        { model: Contact },
        { model: About },
        { model: CV },
      ],
    });
    if (!user) {
      res.status(404).send();
    }
    res.json(user).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get User Data from username
router.get("/:username", async (req, res, next) => {
  try {
    let allData = await User.findOne({
      where: { username: req.params.username },
      include: [
        {
          separate: true,
          model: Collection,
          order: [["order", "ASC"]],
          include: { model: Work, separate: true, order: [["order", "ASC"]] },
        },
        { model: Contact },
        { model: About },
        { model: CV },
      ],
    });

    if (!allData) {
      res.status(404).send("User not found");
    }

    let cv = [];
    let cvData = JSON.stringify(allData.dataValues.cv, 2, 0);
    let cvObj = JSON.parse(cvData);
    let headings = {
      education: "Education",
      groupExhibition: "Selected Group Exhibition",
      soloExhibition: "Solo Exhibition",
      teaching: "Teaching",
      experience: "Related Experience",
      communityInvolvement: "Community Involvment",
      advocacy: "Advocacy",
      press: "Press",
      publications: "Publications",
      awards: "Awards",
      residencies: "Residencies",
    };
    for (let key in cvObj) {
      if (key in headings && cvObj[key]) {
        let heading = headings[key];
        cv.push({ title: [heading], data: cvObj[key].split("\n") });
      }
    }
    const userData = {
      id: allData.dataValues.id,
      username: allData.dataValues.username,
      siteTitle: allData.dataValues.siteTitle,
      email: allData.dataValues.email,
      firstName: allData.dataValues.firstName,
      lastName: allData.dataValues.lastName,
      about: allData.dataValues.about,
      contact: allData.dataValues.contact,
      cv: cv,
      cvImg: allData.dataValues.cv.imgId,
      collections: allData.dataValues.collections,
      domain: allData.dataValues.domain,
      cname: allData.dataValues.cname,
      template: allData.dataValues.template,
    };
    res.status(200).send(userData);
  } catch (err) {
    console.log("error", err);
  }
});

router.get("/domain/:domain", async (req, res, next) => {
  try {
    let allData = await User.findOne({
      where: { domain: req.params.domain },
      include: [
        {
          separate: true,
          model: Collection,
          order: [["order", "ASC"]],
          include: { model: Work, separate: true, order: [["order", "ASC"]] },
        },
        { model: Contact },
        { model: About },
        { model: CV },
      ],
    });

    if (!allData) {
      res.status(404).send("User not found");
    }

    let cv = [];
    let cvData = JSON.stringify(allData.dataValues.cv, 2, 0);
    let cvObj = JSON.parse(cvData);
    let headings = {
      education: "Education",
      groupExhibition: "Selected Group Exhibition",
      soloExhibition: "Solo Exhibition",
      teaching: "Teaching",
      experience: "Related Experience",
      communityInvolvement: "Community Involvment",
      advocacy: "Advocacy",
      press: "Press",
      publications: "Publications",
      awards: "Awards",
      residencies: "Residencies",
    };
    for (let key in cvObj) {
      if (key in headings && cvObj[key]) {
        let heading = headings[key];
        cv.push({ title: [heading], data: cvObj[key].split("\n") });
      }
    }
    const userData = {
      id: allData.dataValues.id,
      username: allData.dataValues.username,
      siteTitle: allData.dataValues.siteTitle,
      email: allData.dataValues.email,
      firstName: allData.dataValues.firstName,
      lastName: allData.dataValues.lastName,
      about: allData.dataValues.about,
      contact: allData.dataValues.contact,
      cv: cv,
      collections: allData.dataValues.collections,
      domain: allData.dataValues.domain,
      cname: allData.dataValues.cname,
      template: allData.dataValues.template,
    };
    res.status(200).send(userData);
  } catch (err) {
    console.log("error", err);
  }
});

//Get all work by a user
router.get("/:userId/work", async (req, res, next) => {
  try {
    let workData = await Collection.findAll({
      where: {
        userId: req.params.userId,
      },

      include: Work,
      order: [["createdAt", "ASC"]],
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
      include: Work,
    });
    let workData = [];

    if (collection) {
      workData = await Work.findAll({
        order: [["order", "ASC"]],
        where: { collectionId: collection.id },
      });
      res.status(200).send({ collection, workData }); ///!
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
router.delete("/:userId/:collection/:imgId", async (req, res, next) => {
  try {
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
    });
    let prefix = "stackathonImgs";
    await Work.destroy({
      where: {
        imgId: `${prefix}/${req.params.imgId}`,
        collectionId: collection.id,
      },
    });
    let works = await Work.findAll({ where: { collectionId: collection.id } });
    res.status(200).send(works);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/delete", async (req, res, next) => {
  try {
    let token = window.localStorage.getItem("token");
    let user = await User.findByToken(token);
    if (user) {
      await User.destroy({
        where: { id: req.params.userId },
        include: { all: true, nested: true },
      });
      res.status(200);
    }
  } catch (err) {
    next(err);
  }
});
