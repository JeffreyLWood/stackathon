const Heroku = require("heroku-client");

const {
  models: { User, About, Contact, CV, Collection },
} = require("../db");

const router = require("express").Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
    let domain = await heroku.post("/apps/slctdwork/domains", {
      body: {
        hostname: req.body.domain,
        sni_endpoint: null,
      },
    });

    await User.update(
      { cname: domain.cname, domain: req.body.domain },
      { where: { id: req.body.user.id } }
    );
    let user = await User.findByPk(req.body.user.id);

    res.status(200).send({ cname: user.cname, domain: user.domain });
  } catch (error) {
    console.log(error);
  }
});

// POST requests
// heroku.post("/apps").then((app) => {});

// // POST requests with body
// heroku.post("/apps", { body: { name: "my-new-app" } }).then((app) => {});

// // PATCH requests with body
// heroku
//   .patch("/apps/my-app", { body: { name: "my-renamed-app" } })
//   .then((app) => {});

// // DELETE requests
// heroku.delete("/apps/my-old-app").then((app) => {});
