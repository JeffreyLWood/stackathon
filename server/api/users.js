const router = require("express").Router();
const {
  models: { User, About, Contact, CV, Work },
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

router.post("/:userId/about", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    await About.create({
      text: req.body.text,
      userId: req.params.userId,
    });
    let newAbout = await About.findOne({
      where: { userId: req.params.userId },
    });
    res.status(200).send(newAbout);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/cv", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    await CV.create({
      header: req.body.header,
      title: req.body.title,
      description: req.body.description,
      from: req.body.from,
      to: req.body.to,
      userId: req.params.userId,
    });
    let cvData = await CV.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).send(cvData);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/contact", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    await Contact.create({
      text: req.body.text,
      email: req.body.email,
      socialMedia: req.body.socialMedia,
      userId: req.params.userId,
    });
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
      email: allData.dataValues.email,
      firstName: allData.dataValues.firstName,
      lastName: allData.dataValues.lastName,
      about: allData.dataValues.about,
      contact: allData.dataValues.contact,
      cv: allData.dataValues.cv,
      works: allData.dataValues.works,
    };
    console.log("USERDATA", userData);
    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
});
