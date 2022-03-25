const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

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
    console.log("req.headers.authorization", req.headers.authorization);
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
