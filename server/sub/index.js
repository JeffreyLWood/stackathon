const router = require("express").Router();
module.exports = router;
const User = require("../db/models/User");

// Used for subdomain username
router.get("/", async (req, res) => {
  try {
    // let userData = await User.findOne({
    //   where: { username: req.params.username },
    // });

    res.status(200).send("User");
  } catch (error) {
    console.log(error);
  }
});
