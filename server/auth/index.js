const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const {
  models: { User, About, Contact, CV, Collection },
} = require("../db");
module.exports = router;
const { Op } = require("sequelize");
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    let username = name.toLowerCase().split(" ").join("");

    let user = await User.findOne({ where: { email: email } });

    if (!user) {
      user = await User.create({
        email: email,
        username: username,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      });
      await user.save();
      const defaultVals = async () => {
        await About.create({
          userId: user.id,
          text: null,
          header: null,
          imgId: null,
          caption: null,
        });
        await CV.create({
          userId: user.id,
          header: "Exhibition",
          text: null,
        });
        await CV.create({
          userId: user.id,
          header: "Education",
          text: null,
        });
        await Contact.create({
          userId: user.id,
          text: "Reach out to me at one of the following:",
        });

        await Collection.create({
          userId: user.id,
          title: "New Collection",
        });
        await Collection.create({
          userId: user.id,
          title: "Hidden",
        });
      };
      // defaultVals();
    }

    console.log("token /google", user.generateToken());
    res.status(201).send({ token: user.generateToken() });
  } catch (error) {
    console.log(error);
  }
});

router.get("/oauth", async (req, res, next) => {
  try {
    console.log("token /oauth", req.headers.authorization);
    res.send(await User.findByToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.userInfo.username,
      firstName: req.body.userInfo.firstName,
      lastName: req.body.userInfo.lastName,
      email: req.body.userInfo.email,
      password: req.body.userInfo.password,
    });

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    console.log("/me", await User.findByToken(req.headers.authorization));
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

//change username
router.put("/:userId/username", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);

    await User.update(
      {
        username: req.body.newUsername,
      },
      { where: { id: req.params.userId } }
    );

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});
